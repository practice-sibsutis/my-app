import React from 'react';
import TodoItem from "./TodoItem";

const TodoList = ({todoList, title, changeStatus, deleteTodo}) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>{title}</h1>
            {todoList.map((todoItem, index) => {
                return (
                <TodoItem todo={todoItem} number={index}
                          key={todoItem.id}
                          changeStatus={changeStatus}
                          deleteTodo={deleteTodo}/>
                );
            })}
        </div>
    );
};

export default TodoList;