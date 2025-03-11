import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const TodoForm = (props) => {
    const [todo, setTodo] = useState({title: '', description: '', isComplete: false});
    const addNewTodo = (e) => {
        e.preventDefault();
        const newTodo = {
            id: Date.now(),
            ...todo
        }

        setTodo({title: '', description: '', isComplete: false});
        props.createTodo(newTodo);
    }

    return (
        <form>
            <MyInput
                type="text"
                value={todo.title}
                placeholder="Название"
                onChange={e => setTodo({...todo, title: e.target.value})}
            />

            <MyInput
                type="text"
                value={todo.description}
                placeholder="Описание"
                onChange={e => setTodo({...todo, description: e.target.value})}
            />

            <MyButton onClick={addNewTodo}>Создать запись</MyButton>
        </form>
    );
};

export default TodoForm;