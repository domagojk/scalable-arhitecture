import Markdown from 'scalable-arhitecture/components/view/Markdown'

function MarkdownAdapter () {
  return {
    adapter: ({ state$, actionCreators }) => ({
      adapt: Markdown,
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

export default MarkdownAdapter
