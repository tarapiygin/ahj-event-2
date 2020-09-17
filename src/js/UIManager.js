export default class UIManager {
  constructor() {
    this.taskInputEl = document.getElementById('task-input');
    this.taskFormEl = document.getElementById('task-form');
    this.pinnedTasksEl = document.getElementById('pinned-tasks');
    this.allTasksEl = document.getElementById('all-tasks');
    this.formSubmitListeners = [];
    this.formInputListeners = [];

    this.registerEvents();
  }

  static renderTask(task) {
    const checked = task.pinned ? 'checked' : '';
    const HTML = `<div class="task">
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
    this.allTasksEl.innerHTML = UIManager.renderTasks(tasks);
  }

  drawPinnedTasks(tasks) {
    this.pinnedTasksEl.innerHTML = UIManager.renderTasks(tasks);
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

  registerEvents() {
    this.taskFormEl.addEventListener('submit', this.onSubmitForm.bind(this));
    this.taskInputEl.addEventListener('input', this.onInputForm.bind(this));
  }
}
