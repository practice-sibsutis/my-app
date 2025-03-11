import {useMemo} from "react";

export const useTodoListWithHiding = (todoList, hideCompleted) => {
    const todoListWithHiding = useMemo(() => {
        if(hideCompleted) {
            return [...todoList].filter(item => !item.isComplete);
        }
        return todoList;
    }, [hideCompleted, todoList]);

    return todoListWithHiding;
}

export const useSortedTodoList = (todoList, sortMode, hideCompleted) => {
    const todoListWithHiding = useTodoListWithHiding(todoList, hideCompleted)
    const sortedTodoList = useMemo(() => {
        if(sortMode) {
            return [...todoListWithHiding].sort((a, b) => a[sortMode].localeCompare(b[sortMode]));
        }
        return todoListWithHiding;
    }, [sortMode, todoListWithHiding]);

    return sortedTodoList;
}

export const useFilteredAndSortedTodoList = (todoList, sortMode, hideCompleted, query) => {
    const sortedTodoList = useSortedTodoList(todoList, sortMode, hideCompleted);
    const filteredAndSortedTodoList = useMemo(() => {
        return sortedTodoList.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedTodoList]);

    return filteredAndSortedTodoList;
}