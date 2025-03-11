import React from 'react';
import MyCheckbox from "./UI/checkbox/MyCheckbox";
import MyButton from "./UI/button/MyButton";

const TodoItem = (props) => {
    return (
    <div className="todoItem">
        <div className="todoItem__content">
            {props.todo.isComplete && <del><strong>{props.number + 1}. {props.todo.title}</strong></del>}
            {!props.todo.isComplete && <strong>{props.number + 1}. {props.todo.title}</strong>}
            {props.todo.isComplete && <div>
                <del>{props.todo.description}</del>
            </div>}

            {!props.todo.isComplete && <div>
                {props.todo.description}
            </div>}
        </div>
        <div className="todoItem__btns">
            <MyCheckbox checked={props.todo.isComplete}
                        onChange={e => props.changeStatus(e.target.checked, props.todo)}/>
          <MyButton style={{marginLeft: "5px"}} onClick={() => props.deleteTodo(props.todo)}>Удалить</MyButton>
        </div>
    </div>
    );
};

export default TodoItem;