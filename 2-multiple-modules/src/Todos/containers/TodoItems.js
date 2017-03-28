import DynamicList from 'scalable-arhitecture/components/view/DynamicList'

function RepoList () {
  return {
    container: ({ state$, actionCreators }) => ({
      component: DynamicList,
      sources: {
        list$: state$.map(s => s.items).distinctUntilChanged(),
        buttonLabel: 'delete',
        onButtonClicked: actionCreators.deleteTodo,
        onNewItem: actionCreators.addTodo
      }
    })
  }
}

export default RepoList
