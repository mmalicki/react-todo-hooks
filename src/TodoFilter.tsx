import React from 'react';
import styled from 'styled-components';
import { all } from 'q';

export type TodoFilterProps = {
    currentFilter: TodoFilterType;
    setCurrentFilter: (filter: TodoFilterType) => void;
};

type LinkProps = {
    selected: boolean;
    children?: React.ReactNode;
    setCurrentFilter: () => void;
};

const Link = ({ selected, children, setCurrentFilter }: LinkProps) => {
    return selected ? (
        <span>{children}</span>
    ) : (
        <a href="#" onClick={setCurrentFilter}>
            {children}
        </a>
    );
};

export enum TodoFilterType {
    ALL,
    COMPLETED,
    IN_PROGRESS
}

export const TodoFilter = ({
    currentFilter,
    setCurrentFilter
}: TodoFilterProps) => {
    return (
        <span>
            <Link
                setCurrentFilter={() => setCurrentFilter(TodoFilterType.ALL)}
                selected={currentFilter === TodoFilterType.ALL}
            >
                All
            </Link>
            {' | '}
            <Link
                setCurrentFilter={() =>
                    setCurrentFilter(TodoFilterType.COMPLETED)
                }
                selected={currentFilter === TodoFilterType.COMPLETED}
            >
                Completed
            </Link>
            {' | '}
            <Link
                setCurrentFilter={() =>
                    setCurrentFilter(TodoFilterType.IN_PROGRESS)
                }
                selected={currentFilter === TodoFilterType.IN_PROGRESS}
            >
                In progress
            </Link>
        </span>
    );
};
