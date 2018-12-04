import { observable, computed, action, decorate, get } from "mobx";
import axios from "axios";

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
          isCompleted: false,
          description: "testing",
          assignee: "Joe",
          dueDate: ""
        },
        {
          name: "sign in flow",
          isCompleted: false,
          description: "testing",
          assignee: "Joe",
          dueDate: ""
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
          isCompleted: true,
          description: "testing",
          assignee: "Joe",
          dueDate: ""
        },
        {
          name: "branch panel",
          isCompleted: true,
          description: "testing",
          assignee: "Joe",
          dueDate: ""
        },
        {
          name: "side navigation bar",
          isCompleted: true,
          description: "testing",
          assignee: "Joe",
          dueDate: ""
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
          isCompleted: false,
          description: "testing",
          assignee: "Joe",
          dueDate: ""
        },
        {
          name: "define relationship",
          isCompleted: false,
          description: "testing",
          assignee: "Joe",
          dueDate: ""
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
    axios
      .get("/api/project/" + projectId)
      .then(res => {
        console.log(res.data);
        this.projectId = res.data.projectId;
        this.projectName = res.data.name;
        this.projectUrl = res.data.cloneUrl;
        this.description = res.data.description;
        this.owner = res.data.owner;
        this.createdAt = res.data.createdAt;
        this.features = res.data.branches.map(branch => {
          const parts = branch.split("/");    // select branch ref's last part
          return {
            name: parts[parts.length - 1],
            description: "describing " + branch,
            location: branch,
            assignee: "Joe",
            subTasks: [{ name: "placeholder", isCompleted: false }]
          };
        });
        this.isLoading = false;
      })
      .catch(err => console.log(err));
  }

  handleChecked(taskName) {
    const subTask = this.features[this.featureIndex].subTasks;
    let index = subTask.findIndex(task => task.name === taskName);
    subTask[index].isCompleted = !subTask[index].isCompleted;
  }

  addSubTask(task) {
    this.features[this.featureIndex].subTasks.push(task);
  }
}

decorate(Project, {
  features: observable,
  featureIndex: observable,
  isLoading: observable,
  // current: observable,
  // elapsedTime: computed,
  change: action,
  updateFeatureIndex: action,
  addFeature: action,
  initData: action,
  handleChecked: action
});

const store = new Project();
export default store;
