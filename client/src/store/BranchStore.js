import { observable, computed, action, decorate, get } from "mobx";

class Project {
  projectName = "onTrack";
  projectUrl = "";
  createdAt = "2018-09-31";
  features = [
    {
      name: "login",
      description: "create login page",
      assignee: "Jason",
      dueDate: "2018-10-31",
      subTasks: [
        {
          name: "sign up procedure",
          isCompleted: false
        }
      ]
    }
  ];

  change(name) {
    this.projectName = name;
  }
}

decorate(Project, {
  test: observable,
  // current: observable,
  // elapsedTime: computed,
  change: action
});

const store = new Project();
export default store;
