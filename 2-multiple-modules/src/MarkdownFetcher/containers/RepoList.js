import DynamicList from 'scalable-arhitecture/components/view/DynamicList'

function RepoList () {
  return {
    container: ({ state$, actionCreators }) => ({
      component: DynamicList,
      sources: {
        list$: state$.map(s => s.repos).distinctUntilChanged(),
        buttonLabel: 'load',
        onButtonClicked: actionCreators.requestReadme,
        onNewItem: actionCreators.addRepo
      }
    })
  }
}

export default RepoList
