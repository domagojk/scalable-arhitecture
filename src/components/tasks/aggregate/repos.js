import { sourceTypes } from 'recyclejs'

export default {
  sourceTypes: {
    action$: sourceTypes.observable.isRequired,
    actionTypes: sourceTypes.object.isRequired
  },

  aggregate: {
    repoName: 'recyclejs/recycle',
    readme: 'choose repository',
    repos: ['codemirror/codemirror', 'recyclejs/recycle', 'bulicmatko/firepack', 'will/fail']
  },

  reducers (sources) {
    return [
      sources.action$
        .filter(a => a.type === sources.actionTypes.REQUEST_README)
        .reducer(function (state, action) {
          state.repoName = action.path
          return state
        }),

      sources.action$
        .filter(a => a.type === sources.actionTypes.README_FETCHED)
        .reducer(function (state, action) {
          state.readme = action.res.document
          return state
        }),

      sources.action$
        .filter(a => a.type === sources.actionTypes.ADD_REPO)
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
