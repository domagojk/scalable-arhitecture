import DynamicList from '../../components/view/DynamicList'
import Items from '../../components/store/Items'

import { DELETE_TODO, ADD_TODO } from './actionTypes'
import { deleteTodo, addTodo } from './actionCreators'

export default ({ store$, action$, Rx }) => ({
  root: DynamicList,

  view: [
    {
      component: DynamicList,
      sources: {
        list$: store$.map(s => s.items).distinctUntilChanged(),
        buttonLabel: 'delete',
        onButtonClicked: deleteTodo,
        onNewItem: addTodo
      }
    }
  ],

  store: [
    {
      component: Items,
      sources: {
        activate$: Rx.Observable.never(),

        addItem$: action$
          .filter(a => a.type === ADD_TODO)
          .map(a => ({ text: a.todo })),

        deleteItem$: action$
          .filter(a => a.type === DELETE_TODO)
          .map(a => a.id),

        initialState: {
          list: [
            { id: 1, text: 'first task' },
            { id: 2, text: 'second task' }
          ],
          lastId: 2
        }
      },
      modify: {
        items: s => s.list
      }
    }
  ]
})
