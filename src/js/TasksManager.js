import Task from './Task';
import Storage from './Storage';
import UIManager from './UIManager';

export default class TasksManager {
  constructor() {
    this.storage = new Storage();
    this.UIManager = new UIManager();
    this.registerEvents();
  }

  onInputForm(string) {
    const tasks = this.storage.findTasks(string);
    this.UIManager.drawAllTasks(tasks);
  }

  onSubmitForm(taskName) {
    if (taskName !== '') {
      const task = new Task(taskName);
      this.storage.addTask(task);
    } else {
      const delay = 5000;
      this.UIManager.showInputError('Нельзя вводить пустую строку', delay);
    }
    this.UIManager.drawAllTasks(this.storage.getUnPinnedTasks());
  }

  registerEvents() {
    this.UIManager.addformInputListener(this.onInputForm.bind(this));
    this.UIManager.addformSubmitListener(this.onSubmitForm.bind(this));
  }

  init() {
    this.storage.loadTasks();
    this.UIManager.drawAllTasks(this.storage.getUnPinnedTasks());
    this.UIManager.drawPinnedTasks(this.storage.getPinnedTasks());
  }
}
