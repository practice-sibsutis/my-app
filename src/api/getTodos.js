export const getTodos = async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
        .then(data => data.json());
}