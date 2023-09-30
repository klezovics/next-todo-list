// Import necessary dependencies
import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import {Button} from "react-bootstrap";

// Define a function to fetch todos
const fetchTodos = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return data;
};

// Define the TodoList component
const TodoList = () => {
    // Use the useQuery hook to fetch and manage todos
    const {
        data: todos,
        error,
        isLoading,
        refetch,  // function to refetch the data
    } = useQuery('todos', fetchTodos);

    return (
        <div>
            <h1>Todo List</h1>
            {/* Display loading, error, or data */}
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>
            )}
            {/* Button to refresh the results */}
            <Button variant="primary" onClick={() => refetch()}>
                Refresh
            </Button>
        </div>
    );
};

export default TodoList;

// In pages/index.js or wherever you want to use the TodoList component
// import TodoList from 'path-to-TodoList-component';
// ...
// <TodoList />
