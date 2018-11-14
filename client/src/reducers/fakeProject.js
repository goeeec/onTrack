export default function(state = null, action) {
  return ({
    projectName: "onTrack",
    projectUrl: "",
    createdAt: "2018-09-31",
    features: [ 
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
            isCompleted: false
          },
          {
            name: "side navigation bar",
            isCompleted: false
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
    ]
  });
}