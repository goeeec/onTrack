import React, { Component } from "react";
import { Grid, List, ListItem, ListSubheader } from "@material-ui/core";
import { observer, inject } from "mobx-react";

import TodoListTask from "./TodoListTask";

const TodoList = inject("store")(
  observer(
    class TodoList extends Component {
      constructor(props) {
        super(props);
        this.state = {
          todos: this.props.store.features[this.props.store.featureIndex]
        };
      }

      // onChangeFeature = e => {
      //   e.preventDefault();
      //   console.log(e.target.index);
      //   let a = this.state.todos.slice();
      //   a[0] = e.target.elements.FeatureName.value;
      //   this.setState({ todos: a });
      //   console.log(this.state.todos);
      // };

      render() {
        const { features } = this.props.store;
        const { featureIndex } = this.props.store;

        return (
          <div>
            <List>
              <ListSubheader>{features[featureIndex].name}</ListSubheader>
              <List className="branch-list">
                {features[featureIndex].subTasks.map((task, i) => {
                  return <TodoListTask key={i} subtask={task} />;
                })}
              </List>
              {/* <ListItem>
                {this.props.store.features[this.props.store.featureIndex].name}
              </ListItem> */}
            </List>
          </div>
        );
      }
    }
  )
);

export default TodoList;
