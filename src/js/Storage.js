export default class Storage {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  findTasks(string) {
    return this.tasks.filter((task) => !task.pinned
      && task.name.toLowerCase().startsWith(string.toLowerCase()));
  }

  getPinnedTasks() {
    return this.tasks.filter((task) => task.pinned);
  }

  getUnPinnedTasks() {
    return this.tasks.filter((task) => !task.pinned);
  }

  saveTasks() {
    localStorage.setItem('state', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('state');
    if (savedTasks !== null) this.tasks = JSON.parse(savedTasks);
  }
}
