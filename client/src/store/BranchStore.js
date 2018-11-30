import { observable, computed, action, decorate, get } from "mobx";

class Project {
  projectName = "onTrack";
  projectUrl = "";
  featureIndex = 0;
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
        },
        {
          name: "sign in flow",
          isCompleted: false
        }
      ]
    },
    {
      name: "dashboard",
      description: "create dashboard",
      assignee: "Joey",
      dueDate: "2018-10-31",
      subTasks: [
        {
          name: "project panel",
          isCompleted: true
        },
        {
          name: "branch panel",
          isCompleted: true
        },
        {
          name: "side navigation bar",
          isCompleted: true
        }
      ]
    },
    {
      name: "database",
      description: "setup database",
      assignee: "Joe",
      dueDate: "2018-10-31",
      subTasks: [
        {
          name: "define data models",
          isCompleted: false
        },
        {
          name: "define relationship",
          isCompleted: false
        }
      ]
    }
  ];

  change(name) {
    this.projectName = name;
  }

  updateFeatureIndex(index) {
    this.featureIndex = index;
  }
}

decorate(Project, {
  test: observable,
  featureIndex: observable,
  // current: observable,
  // elapsedTime: computed,
  change: action,
  updateFeatureIndex: action
});

const store = new Project();
export default store;
