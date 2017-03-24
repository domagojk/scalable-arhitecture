import Rx from 'rxjs/Rx'

export default {
  interface: {
    input$: 'observable',
    debounceTime: 'number',
    endpoint: 'function',
    onSuccess: 'function',
    onError: 'function',
    outputActionType: 'function'
  },

  actions (sources) {
    return [
      sources.input$
        .debounceTime(sources.debounceTime)
        .switchMap(input => Rx.Observable.ajax(sources.endpoint(input))
          .map(sources.onSuccess)
          .catch(err => Rx.Observable.of(sources.onError(err)))
        )
        .map(sources.outputActionType)
    ]
  }
}
