import { sourceTypes } from 'recyclejs'

export default {
  sourceTypes: {
    readmeRequest$: sourceTypes.observable.isRequired,
    documentResponse$: sourceTypes.observable.isRequired,
    addRepoRequests$: sourceTypes.observable.isRequired
  },

  aggregate: {
    repoName: 'recyclejs/recycle',
    readme: 'choose repository',
    repos: ['codemirror/codemirror', 'recyclejs/recycle', 'bulicmatko/firepack', 'will/fail']
  },

  reducers (sources) {
    return [
      sources.readmeRequest$
        .reducer(function (state, action) {
          state.repoName = action.path
          return state
        }),

      sources.documentResponse$
        .reducer(function (state, action) {
          state.readme = action.res.document
          return state
        }),

      sources.addRepoRequests$
        .reducer(function (state, event) {
          if (state.repos.indexOf(event.repo) !== -1) {
            return state
          }
          state.repos = state.repos.concat(event.repo)
          return state
        })
    ]
  }
}
