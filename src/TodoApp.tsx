import styled from 'styled-components';

import { Todo } from './Todo';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import React, { useState, useReducer } from 'react';
import { TodoFilter, TodoFilterType } from './TodoFilter';

const AppLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

type AddAction = {
    type: 'ADD_TODO';
    payload: Todo;
};

type DeleteAction = {
    type: 'DELETE_TODO';
    payload: number;
};

type ChangeCompletedAction = {
    type: 'CHANGE_COMPLETED_TODO';
    payload: number;
};

type TodoAction = AddAction | DeleteAction | ChangeCompletedAction;

const todosReducer = (state: Todo[], action: TodoAction) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'CHANGE_COMPLETED_TODO':
            return state.map(todo =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return assertNever(action);
    }
};

export const TodoApp = () => {
    const [todos, dispatch] = useReducer(todosReducer, []);

    const [currentFilter, setCurrentFilter] = useState(TodoFilterType.ALL);

    const addTodo = (newTodo: Todo) => {
        dispatch({ type: 'ADD_TODO', payload: newTodo });
    };

    const deleteTodo = (todoId: number) => {
        dispatch({ type: 'DELETE_TODO', payload: todoId });
    };

    const changeCompletedTodo = (todoId: number) => {
        dispatch({ type: 'CHANGE_COMPLETED_TODO', payload: todoId });
    };

    const applyCurrentFilter = (): Todo[] => {
        switch (currentFilter) {
            case TodoFilterType.ALL:
                return todos;
            case TodoFilterType.COMPLETED:
                return todos.filter(todo => todo.completed);
            case TodoFilterType.IN_PROGRESS:
                return todos.filter(todo => !todo.completed);
        }
    };

    return (
        <AppLayout>
            <h2>Todo app</h2>
            <AddTodo onAddTodo={addTodo} />
            <TodoFilter
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
            />
            <TodoList
                todos={applyCurrentFilter()}
                onDeleteTodo={deleteTodo}
                onChangeCompletedTodo={changeCompletedTodo}
            />
        </AppLayout>
    );
};

const assertNever = (x: never): never => {
    throw new Error('Unexpected object: ' + x);
};
