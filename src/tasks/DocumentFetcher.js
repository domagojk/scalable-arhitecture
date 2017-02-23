/* global atob */
import { sourceTypes } from 'recyclejs'
import Rx from 'rxjs/Rx'

function DocumentFetcher () {
  return {
    sourceTypes: {
      document$: sourceTypes.stream.isRequired,
      event$: sourceTypes.stream.isRequired,
      actionCreators: sourceTypes.object.isRequired,
      actionTypes: sourceTypes.object.isRequired,
      getUrl: sourceTypes.object.isRequired
    },

    actions (sources) {
      return [
        sources.event$
          .filterByType(sources.actionTypes.OPEN_DOCUMENT)
          .map(e => e.path)
          .debounceTime(500)
          .switchMap(path => Rx.Observable.ajax(sources.getUrl(path))
            .map(res => ({ error: false, document: atob(res.response.content) }))
            .catch(err => Rx.Observable.of({ error: err.message, document: '' }))
          )
          .map(sources.actionCreators.documentFetched),

        sources.event$
          .filterByType(sources.actionTypes.OPEN_DOCUMENT)
          .mapTo(true)
          .merge(sources.document$.mapTo(false))
          .map(sources.actionCreators.isFetchingDocument)
      ]
    }
  }
}

export default DocumentFetcher
