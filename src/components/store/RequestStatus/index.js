export default {
  interface: {
    requestInit$: 'observable',
    requestComplete$: 'observable',
    parseError: 'function',
    parseData: 'function',
    initialState: 'object'
  },

  initialState: sources => ({
    requestLoading: sources.initialState.requestLoading,
    requestError: sources.initialState.requestError,
    data: sources.initialState.data
  }),

  reducers (sources) {
    return [
      sources.requestInit$
        .reducer(function (state, action) {
          state.requestLoading = true
          return state
        }),

      sources.requestComplete$
        .reducer(function (state, action) {
          state.requestLoading = false
          state.requestError = sources.parseError(action)
          state.data = sources.parseData(action)
          return state
        })
    ]
  }
}
