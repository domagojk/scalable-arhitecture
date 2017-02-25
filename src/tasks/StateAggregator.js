import { sourceTypes } from 'recyclejs'

function DocumentFetcher () {
  return {
    aggregator: true,

    sourceTypes: {
      openDocumentRequests$: sourceTypes.stream.isRequired,
      addRepoRequests$: sourceTypes.stream.isRequired
    },

    initialState: {
      documentPath: '',
      repos: ['codemirror/codemirror', 'recyclejs/recycle', 'bulicmatko/firepack', 'will/fail']
    },

    reducers (sources) {
      return [
        sources.openDocumentRequests$
          .reducer(function (state, event) {
            state.documentPath = event.path
            return state
          }),

        sources.addRepoRequests$
          .reducer(function (state, event) {
            state.repos.push(event.repo)
            return state
          })
      ]
    }
  }
}

export default DocumentFetcher
