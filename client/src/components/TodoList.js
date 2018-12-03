import React, { Component } from "react";
import {
  Collection,
  CollectionItem,
  Input,
  Button,
  Modal,
  Task
} from "react-materialize";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.branch.subTasks
    };
  }

  onChangeFeature = e => {
    e.preventDefault();
    console.log(e.target.index);
    let a = this.state.todos.slice();
    a[0] = e.target.elements.FeatureName.value;
    this.setState({ todos: a });
    console.log(this.state.todos);
  };

  render() {
    return (
      <div>
        <h2>{this.props.branch.name}</h2>
        <Collection>
          {this.state.todos.map((task, i) => {
            let defValue = "";
            if (task.isCompleted === true) {
              defValue = "checked";
              console.log(task.name + " is completed");
            } else {
              defValue = "unchecked";
            }
            console.log(task.name + ": " + defValue);
            return (
              <CollectionItem index={i} key={i}>
                <Input
                  type="checkbox"
                  className="filled-in"
                  label={task.name}
                />
                <Button
                  floating
                  className="red"
                  waves="light"
                  icon="delete"
                  onClick={() => {
                    this.setState(state => ({
                      todos: state.todos.filter(item => item !== task)
                    }));
                  }}
                  key={task}
                />
                <Modal
                  header="Edit Branch"
                  trigger={
                    <Button floating className="blue" waves="light" icon="edit">
                      Edit
                    </Button>
                  }
                />
              </CollectionItem>
            );
          })}
        </Collection>
      </div>
    );
  }
}

export default TodoList;
