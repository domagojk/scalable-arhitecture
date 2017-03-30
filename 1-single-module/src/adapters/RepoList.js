import DynamicList from 'scalable-arhitecture/components/view/DynamicList'

function RepoList () {
  return {
    adapter: ({ state$, actionCreators }) => ({
      adapt: DynamicList,
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
