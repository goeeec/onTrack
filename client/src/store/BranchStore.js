import { observable, computed, action, decorate, get } from "mobx";
import axios from 'axios';

class Project {
  projectName = "";
  projectId = "";
  projectUrl = "";
  owner = "";
  description = "";
  featureIndex = 0;
  createdAt = "2018-09-31";
  isLoading = true;
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

  addFeature(newFeature) {
    this.features.push(newFeature);
  }

  initData(projectId) {
    axios.get("/github/project/" + projectId)
      .then(res => {
        console.log(res.data);
        this.projectId = res.data.projectId;
        this.projectName = res.data.name;
        this.projectUrl = res.data.cloneUrl;
        this.description = res.data.description;
        this.owner = res.data.owner;
        this.createdAt = res.data.createdAt;
        this.isLoading = false;
      })
      .catch(err => console.log(err));
  }
}

decorate(Project, {
  test: observable,
  featureIndex: observable,
  isLoading: observable,
  // current: observable,
  // elapsedTime: computed,
  change: action,
  updateFeatureIndex: action,
  addFeature: action,
  initData: action
});

const store = new Project();
export default store;
