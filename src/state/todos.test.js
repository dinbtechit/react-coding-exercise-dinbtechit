// add your tests here

import {store} from "../App";
import thunk from "redux-thunk";

const create = () => {
    const next = jest.fn()
    const invoke = action => thunk(store)(next)(action)
    return {store, next, invoke}
}

describe('Test Todo State', () => {

    it("Test LIST_TODOS", () => {
        const {store, next, invoke} = create()
        const action = {type: 'LIST_TODOS', payload: ['one', 'two']}
        //invoke(action)
        invoke((dispatch, getState) => {
            dispatch(action)
            getState()
        })
        expect(store.getState()).toEqual({list: ['one', 'two']})
    });

    it("Test ADD_TODO", () => {
        const {store, next, invoke} = create()
        const action = {type: 'ADD_TODO', payload: 'three'}
        invoke((dispatch, getState) => {
            dispatch(action)
            getState()
        })
        expect(store.getState()).toEqual({list: ['one', 'two', 'three']})
    });
})
