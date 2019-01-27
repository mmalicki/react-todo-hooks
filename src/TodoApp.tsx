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

type TodoAction = 'ADD_TODO' | 'DELETE_TODO' | 'CHANGE_COMPLETED_TODO';

const todosReducer = (
    state: Todo[],
    action: { type: TodoAction; payload: any }
) => {
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
