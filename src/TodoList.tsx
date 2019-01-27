import React, { Component, useRef, RefObject, useState } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import { Todo } from './Todo';

export type TodoListProps = {
    todos: Todo[];
    onDeleteTodo: (id: number) => void;
    onChangeCompletedTodo: (id: number) => void;
};

const DeleteIcon = styled.i.attrs({
    className: 'fas fa-trash'
})`
    & :hover {
        cursor: pointer;
        background-color: red;
    }
`;

const Completable = styled.span<{ completed: boolean }>`
    text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`;

export const TodoList = ({
    todos,
    onDeleteTodo,
    onChangeCompletedTodo
}: TodoListProps) => {
    return (
        <ul>
            {todos.map((todo, i) => (
                <li key={todo.id}>
                    <span>
                        <Completable
                            completed={todo.completed}
                            onClick={() => onChangeCompletedTodo(todo.id)}
                        >
                            {todo.text}
                        </Completable>
                        &nbsp;
                        <DeleteIcon onClick={() => onDeleteTodo(todo.id)} />
                    </span>
                </li>
            ))}
        </ul>
    );
};
