import { sourceTypes } from 'recyclejs'

export default {
  sourceTypes: {
    action$: sourceTypes.observable.isRequired,
    actionTypes: sourceTypes.object.isRequired
  },

  aggregate: {
    isFetching: false,
    errorFetching: false
  },

  reducers (sources) {
    return [
      sources.action$
        .filter(a => a.type === sources.actionTypes.REQUEST_README)
        .reducer(function (state, action) {
          state.isFetching = true
          return state
        }),

      sources.action$
        .filter(a => a.type === sources.actionTypes.README_FETCHED)
        .reducer(function (state, action) {
          state.isFetching = false
          state.errorFetching = action.res.error
          return state
        })
    ]
  }
}
