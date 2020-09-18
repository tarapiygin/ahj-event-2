import Task from './Task';
import Storage from './Storage';
import UIManager from './UIManager';

export default class TasksManager {
  constructor() {
    this.storage = new Storage();
    this.UIManager = new UIManager();
    this.activeFilter = '';
  }

  onInputForm(string) {
    this.activeFilter = string;
    const tasks = this.storage.findTasks(this.activeFilter);
    this.UIManager.drawAllTasks(tasks);
  }

  onSubmitForm(taskName) {
    if (taskName !== '') {
      const task = new Task(taskName);
      task.index = this.storage.addTask(task);
      this.storage.saveTasks();
      this.UIManager.drawAllTasks(this.storage.getUnPinnedTasks());
    } else {
      const delay = 5000;
      this.UIManager.showInputError('Нельзя вводить пустую строку', delay);
    }
  }

  onChangeTask(index, checked) {
    const task = this.storage.tasks[index];
    task.pinned = checked;
    this.storage.saveTasks();
    this.UIManager.drawAllTasks(this.storage.findTasks(this.activeFilter));
    this.UIManager.drawPinnedTasks(this.storage.getPinnedTasks());
  }

  registerEvents() {
    this.UIManager.addformInputListener(this.onInputForm.bind(this));
    this.UIManager.addformSubmitListener(this.onSubmitForm.bind(this));
    this.UIManager.addchangeTaskListener(this.onChangeTask.bind(this));
  }

  init() {
    this.storage.loadTasks();
    this.registerEvents();
    this.UIManager.drawAllTasks(this.storage.getUnPinnedTasks());
    this.UIManager.drawPinnedTasks(this.storage.getPinnedTasks());
  }
}
