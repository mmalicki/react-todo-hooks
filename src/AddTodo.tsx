import React, { RefObject, useRef } from 'react';

export type AddTodoProps = {
    onAddTodo: (newTodo: string) => void;
};

export const AddTodo = ({ onAddTodo }: AddTodoProps) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null);

    const addTodo = () => {
        const inputValue = inputRef.current!.value;
        if (inputValue !== '') {
            onAddTodo(inputValue);
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
