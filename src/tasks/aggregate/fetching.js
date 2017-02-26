import { sourceTypes } from 'recyclejs'

export default {
  sourceTypes: {
    readmeRequest$: sourceTypes.observable.isRequired,
    documentResponse$: sourceTypes.observable.isRequired
  },

  aggregate: {
    isFetching: false,
    errorFetching: false
  },

  reducers (sources) {
    return [
      sources.readmeRequest$
        .reducer(function (state, action) {
          state.isFetching = true
          return state
        }),

      sources.documentResponse$
        .reducer(function (state, action) {
          state.isFetching = false
          state.errorFetching = action.res.error
          return state
        })
    ]
  }
}
