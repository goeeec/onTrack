import React, { Component } from "react";
import { Grid, List, ListItem, ListSubheader } from "@material-ui/core";
import { observer, inject } from "mobx-react";

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
        {
          console.log(this.props.store.featureIndex);
          console.log(this.state);
        }
        return (
          <div>
            <List>
              <ListSubheader>
                {this.props.store.features[this.props.store.featureIndex].name}
              </ListSubheader>
              {/* <List className="branchListHover branch-list">
            {this.state.todos.map((task, i) => {
              return <ListItem key={i}>{task.name}</ListItem>;
            })}
          </List> */}
              <ListItem>
                {this.props.store.features[this.props.store.featureIndex].name}
              </ListItem>
            </List>

            {/* <h2>{this.props.branch.name}</h2>
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
        </Collection> */}
          </div>
        );
      }
    }
  )
);

export default TodoList;
