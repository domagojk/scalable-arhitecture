import { Observable } from 'rxjs/Observable'
import Items from 'scalable-arhitecture/components/reducers/Items'
import App from './App'

const actionTypes = {
  DELETE_TODO: 'DELETE_TODO',
  ADD_TODO: 'ADD_TODO'
}

const actionCreators = {
  addTodo: todo => ({ type: actionTypes.ADD_TODO, todo }),
  deleteTodo: id => ({ type: actionTypes.DELETE_TODO, id })
}

export default ({ state$, action$ }) => ({
  state: {
    substate: 'todos',
    initialState: {
      items: [
        { id: 1, text: 'first task' },
        { id: 2, text: 'second task' }
      ],
      lastId: 2
    },
    reducers: [{
      component: Items,
      sources: {
        activate$: Observable.never(),

        addItem$: action$
          .filter(a => a.type === actionTypes.ADD_TODO)
          .map(a => ({ text: a.todo })),

        deleteItem$: action$
          .filter(a => a.type === actionTypes.DELETE_TODO)
          .map(a => a.id)
      },
      linkWithState: {
        list: 'items',
        lastId: 'lastId'
      }
    }]
  },

  view: {
    driver: 'react',
    root: App,
    containerSources: {
      state$: state$.map(s => s.todos),
      actionCreators
    }
  }
})
