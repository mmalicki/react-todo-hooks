import styled from 'styled-components';

import { Todo } from './Todo';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import React, { useState } from 'react';
import { TodoFilter, TodoFilterType } from './TodoFilter';

const AppLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const [lastTodoId, setLastTodoId] = useState(0);

    const [currentFilter, setCurrentFilter] = useState(TodoFilterType.ALL);

    const deleteTodo = (todoId: number) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    };

    const changeCompletedTodo = (todoId: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
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
            <AddTodo
                onAddTodo={newTodo => {
                    const newTodoId = lastTodoId + 1;
                    setTodos([
                        ...todos,
                        { id: newTodoId, text: newTodo, completed: false }
                    ]);
                    setLastTodoId(newTodoId);
                }}
            />
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
