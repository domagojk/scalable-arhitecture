import { sourceTypes } from 'recyclejs'

function DocumentFetcher () {
  return {
    aggregator: true,

    sourceTypes: {
      event$: sourceTypes.stream.isRequired,
      actionTypes: sourceTypes.object.isRequired
    },

    initialState: {
      filePath: 'recyclejs/recycle',
      repos: ['codemirror/codemirror', 'recyclejs/recycle', 'bulicmatko/firepack', 'will/fail']
    },

    reducers (sources) {
      return [
        sources.event$
          .filterByType(sources.actionTypes.OPEN_DOCUMENT)
          .reducer(function (state, event) {
            state.filePath = event.path
            return state
          }),

        sources.event$
          .filterByType(sources.actionTypes.ADD_REPO)
          .reducer(function (state, event) {
            state.repos.push(event.repo)
            return state
          })
      ]
    }
  }
}

export default DocumentFetcher
