import Markdown from 'scalable-arhitecture/components/view/Markdown'

function MarkdownContainer () {
  return {
    container: ({ state$, actionCreators }) => ({
      component: Markdown,
      sources: {
        documentId$: state$.map(s => s.activeRepo).distinctUntilChanged(),
        documentContent$: state$.map(s => s.fetchedReadme).distinctUntilChanged(),
        requestLoading$: state$.map(s => s.isFetching).distinctUntilChanged(),
        requestError$: state$.map(s => s.errorFetching).distinctUntilChanged(),
        requestDocument: actionCreators.requestReadme
      }
    })
  }
}

export default MarkdownContainer
