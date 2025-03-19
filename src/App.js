import React, {useEffect, useLayoutEffect, useState} from "react";
import './styles/App.css'
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import MyCheckbox from "./components/UI/checkbox/MyCheckbox";
import {
  useFilteredAndSortedTodoList,
} from "./hooks/useSortedAndFilteredTodoList";
import {getTodos} from "./api/getTodos";
import Loader from "./components/UI/loader/Loader";
import {ChangeStatusContext} from "./Context"

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
      setIsLoading(true);
      setTimeout(async () => {
          const data = (await getTodos()).map(item => {
              return ({
                  id: item.id,
                  title: item.title,
                  description: item.title,
                  isComplete: item.completed
              })
          });

          /*const data = [
              {id: 1, title: 'Выучить HTML', description: 'Выучить HTML', isComplete: false},
              {id: 2, title: 'Выучить CSS', description: 'Выучить CSS', isComplete: false},
              {id: 3, title: 'Выучить JavaScript', description: 'Выучить JavaScript', isComplete: false},
              {id: 4, title: 'Выучить React', description: 'Выучить React', isComplete: false}];*/

          setTodoList(data);
          setIsLoading(false);
      }, 2000);
  }

  useEffect(() => {
      fetchTodos();
  }, [])

  const [hideCompleted, setHideCompleted] = useState(false);
  const [sortMode, setSortMode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeStatus = (isComplete, todo) => {
    setTodoList(todoList.map(item => {
      if(todo.id === item.id) {
        item.isComplete = isComplete;
      }
      return item;
    }));
  }



  const sortTodoList = mode => {
    setSortMode(mode);
  }

  const filteredAndSortedTodoList = useFilteredAndSortedTodoList(todoList, sortMode, hideCompleted, searchQuery);

  const deleteTodo = todo => {
    setTodoList(todoList.filter(item => item.id !== todo.id));
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: "20px"}} onClick={() => setIsModalVisible(!isModalVisible)}>
        Добавить запись
      </MyButton>
      <MyModal visible={isModalVisible} setVisible={setIsModalVisible}>
        <TodoForm createTodo={(newTodo) => {
          setTodoList([...todoList, newTodo]);
          setIsModalVisible(false);
        }}/>
      </MyModal>

      <hr style={{marginTop: '20px', marginBottom: '20px'}}/>
      Скрыть выполненные
      <MyCheckbox checked={hideCompleted} onChange={e => setHideCompleted(e.target.checked)}/>
      <MySelect value={sortMode} onChange={sortTodoList} defaultValue="Сортировка по..." options={[
          {id: 1, value: 'title', title: 'По названию'},
        {id: 2, value: 'description', title: 'По описанию'}]}/>
      <MyInput placeholder="Поиск" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
        {isLoading ? <div style={{display: "flex", justifyContent: "center"}}><Loader/></div>
            : <ChangeStatusContext value={changeStatus}>
                    <TodoList todoList={filteredAndSortedTodoList}
                    title='Список дел'
                    changeStatus={changeStatus} deleteTodo={deleteTodo}/>
                </ChangeStatusContext>}
    </div>
  );
}

export default App;
