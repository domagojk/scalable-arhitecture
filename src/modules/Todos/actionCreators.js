import { DELETE_TODO, ADD_TODO } from './actionTypes'

export const addTodo = todo => ({ type: ADD_TODO, todo })
export const deleteTodo = id => ({ type: DELETE_TODO, id })
