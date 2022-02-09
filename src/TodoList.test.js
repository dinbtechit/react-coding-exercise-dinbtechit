// add test coverage for the TodoList component here
import {TodoList} from "./TodoList";
import {store} from "./App";
import {Provider} from "react-redux";
import {cleanup, configure, fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

configure({ asyncUtilTimeout: 3000 })

describe("TodoList", () => {

    afterEach(cleanup)

    it('Ensure All components are displayed', () => {
        const div = document.createElement('div')
        render(
            <Provider store={store}>
                <TodoList/>
            </Provider>,
            div)

        const element = screen.getByTestId('todo')
        const addButton = screen.getByRole('button')
        const todoList = screen.getByRole('list')
        expect(element).toBeInTheDocument()
        expect(addButton).toBeInTheDocument()
        expect(todoList).toBeInTheDocument()
    });

    it('Add a todo Item', async () => {
        const div = document.createElement('div')
        render(
            <Provider store={store}>
                <TodoList/>
            </Provider>,
            div)

        const element = screen.getByTestId('todo');
        const addButton = screen.getByRole('button');
        const todoList = screen.getByRole('list');
        // check Added item exist on the table
        fireEvent.change(element, { target: {value: 'norris'}})
        fireEvent.click(addButton)
        const newTodo = await screen.findByTestId('todo-2')
        expect(newTodo).toBeInTheDocument()
        expect(todoList).toHaveTextContent(/norris/i)
    })
})

