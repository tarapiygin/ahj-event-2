export default class UIManager {
  constructor() {
    this.taskInputEl = document.getElementById('task-input');
    this.taskFormEl = document.getElementById('task-form');
    this.pinnedTasksEl = document.getElementById('pinned-tasks');
    this.allTasksEl = document.getElementById('all-tasks');
    this.formSubmitListeners = [];
    this.formInputListeners = [];
    this.changeTaskListeners = [];

    this.registerFormEvents();
  }

  static renderTask(task) {
    const checked = task.pinned ? 'checked' : '';
    const HTML = `<div class="task" data-index="${task.index}">
      <div class="task-name">${task.name}</div>
      <input type="checkbox" name="pinned-task" value="pinned" ${checked}>
    </div>`;
    return HTML;
  }

  static renderTasks(tasks) {
    let HTML = '';
    tasks.forEach((task) => {
      HTML += UIManager.renderTask(task);
    });
    return HTML;
  }

  drawAllTasks(tasks) {
    let HTML = UIManager.renderTasks(tasks);
    if (HTML === '') HTML = 'No tasks found';
    this.allTasksEl.innerHTML = HTML;
    this.registerTaskEvents(this.allTasksEl);
  }

  drawPinnedTasks(tasks) {
    let HTML = UIManager.renderTasks(tasks);
    if (HTML === '') HTML = 'No pinned tasks';
    this.pinnedTasksEl.innerHTML = HTML;
    this.registerTaskEvents(this.pinnedTasksEl);
  }

  showInputError(string, delay) {
    const element = document.createElement('div');
    element.classList.add('error');
    element.innerText = string;
    this.taskFormEl.after(element);
    setTimeout(() => element.remove(), delay);
  }

  /**
 * Добавляет функцию слушателя на изменение поля ввода
 * @param callback
 */
  addformInputListener(callback) {
    this.formInputListeners.push(callback);
  }

  /**
 * Добавляет функцию слушателя на отправку формы
 * @param callback
 */
  addformSubmitListener(callback) {
    this.formSubmitListeners.push(callback);
  }

  /**
 * Добавляет функцию слушателя на событие change для задачи
 * @param callback
 */
  addchangeTaskListener(callback) {
    this.changeTaskListeners.push(callback);
  }

  onInputForm(event) {
    const input = event.currentTarget;
    this.formInputListeners.forEach((o) => o.call(null, input.value));
  }

  onSubmitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const string = form.task.value;
    form.task.value = '';
    this.formSubmitListeners.forEach((o) => o.call(null, string));
  }

  onChangeTask(event) {
    const { index } = event.currentTarget.closest('.task').dataset;
    const { checked } = event.currentTarget;
    this.changeTaskListeners.forEach((o) => o.call(null, index, checked));
  }

  registerFormEvents() {
    this.taskFormEl.addEventListener('submit', this.onSubmitForm.bind(this));
    this.taskInputEl.addEventListener('input', this.onInputForm.bind(this));
  }

  registerTaskEvents(tasksContainer) {
    const taskList = Array.from(tasksContainer.getElementsByClassName('task'));
    taskList.forEach((task) => {
      const inputEl = task.querySelector('[name=pinned-task]');
      inputEl.addEventListener('change', this.onChangeTask.bind(this));
    });
  }
}
