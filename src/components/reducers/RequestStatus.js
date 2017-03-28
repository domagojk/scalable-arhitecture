function RequestStatus () {
  return {
    interface: {
      requestInit$: 'observable',
      requestSuccess$: 'observable',
      requestFailure$: 'observable'
    },

    actions (sources) {
      return [
        sources.requestInit$
          .reducer(function (state, action) {
            state.requestLoading = true
            return state
          }),

        sources.requestSuccess$
          .reducer(function (state, action) {
            state.requestLoading = false
            state.requestError = false
            state.data = action.payload
            return state
          }),

        sources.requestFailure$
          .reducer(function (state, action) {
            state.requestLoading = false
            state.requestError = action.payload
            state.data = null
            return state
          })
      ]
    }
  }
}

export default RequestStatus
