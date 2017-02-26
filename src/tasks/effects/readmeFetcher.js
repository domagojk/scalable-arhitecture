/* global atob */
import { sourceTypes } from 'recyclejs'
import Rx from 'rxjs/Rx'

export default {
  sourceTypes: {
    readmeRequest$: sourceTypes.observable.isRequired,
    getReadmeEndpoint: sourceTypes.func.isRequired,
    readmeFetched: sourceTypes.func.isRequired
  },

  actions (sources) {
    return [
      sources.readmeRequest$
        .map(a => a.path)
        .debounceTime(500)
        .switchMap(path => Rx.Observable.ajax(sources.getReadmeEndpoint(path))
          .map(res => ({ error: false, document: atob(res.response.content) }))
          .catch(err => Rx.Observable.of({ error: err.message, document: '' }))
        )
        .map(sources.readmeFetched)
    ]
  }
}
