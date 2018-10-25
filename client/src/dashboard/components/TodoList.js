import React, { Component } from 'react';
import { Collection, CollectionItem, Input } from 'react-materialize';

class TodoList extends Component {
  render() {
    return(
      <div>
        <h2>{this.props.branch.name}</h2>
        <Collection>
          {this.props.branch.subTasks.map((task, i) => {
            let defValue = '';
            if (task.isCompleted === true) {
              defValue = 'checked';
              console.log(task.name + ' is completed');
            } else {
              defValue = 'unchecked';
            }
            console.log(task.name + ': ' + defValue);
            return(
              <CollectionItem index={i} key={i} >
                <Input type="checkbox" className="filled-in" label={task.name} />
              </CollectionItem>
            );
          })}
        </Collection>
      </div>
    );
  }
}

export default TodoList;