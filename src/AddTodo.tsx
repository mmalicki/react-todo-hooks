import React, { RefObject, useRef, useState } from 'react';
import { Todo } from './Todo';

export type AddTodoProps = {
    onAddTodo: (newTodo: Todo) => void;
};

export const AddTodo = ({ onAddTodo }: AddTodoProps) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null);

    const [lastTodoId, setLastTodoId] = useState(0);

    const addTodo = () => {
        const inputValue = inputRef.current!.value;
        if (inputValue !== '') {
            const newTodoId = lastTodoId + 1;
            onAddTodo({ id: newTodoId, text: inputValue, completed: false });
            setLastTodoId(newTodoId);
            inputRef.current!.value = '';
        }
    };

    return (
        <div>
            <input ref={inputRef} />
            &nbsp;
            <button onClick={addTodo}>Add todo</button>
        </div>
    );
};
