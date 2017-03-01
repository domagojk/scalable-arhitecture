/* global atob */
import { sourceTypes } from 'recyclejs'
import Rx from 'rxjs/Rx'

export default {
  sourceTypes: {
    action$: sourceTypes.observable.isRequired,
    actionTypes: sourceTypes.object.isRequired,
    actionCreators: sourceTypes.object.isRequired,
    getReadmeEndpoint: sourceTypes.func.isRequired
  },

  actions (sources) {
    return [
      sources.action$
        .filter(a => a.type === sources.actionTypes.REQUEST_README)
        .map(a => a.path)
        .debounceTime(500)
        .switchMap(path => Rx.Observable.ajax(sources.getReadmeEndpoint(path))
          .map(res => ({ error: false, document: atob(res.response.content) }))
          .catch(err => Rx.Observable.of({ error: err.message, document: '' }))
        )
        .map(sources.actionCreators.readmeFetched)
    ]
  }
}
