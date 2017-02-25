/* global atob */
import { sourceTypes } from 'recyclejs'
import Rx from 'rxjs/Rx'

function DocumentFetcher () {
  return {
    sourceTypes: {
      document$: sourceTypes.stream.isRequired,
      openDocumentRequests$: sourceTypes.stream.isRequired,
      getDocumentEndpoint: sourceTypes.func.isRequired,
      documentFetched: sourceTypes.func.isRequired,
      changeDocumentStatus: sourceTypes.func.isRequired
    },

    actions (sources) {
      return [
        sources.openDocumentRequests$
          .map(e => e.path)
          .debounceTime(500)
          .switchMap(path => Rx.Observable.ajax(sources.getDocumentEndpoint(path))
            .map(res => ({ error: false, document: atob(res.response.content) }))
            .catch(err => Rx.Observable.of({ error: err.message, document: '' }))
          )
          .map(sources.documentFetched),

        sources.openDocumentRequests$
          .mapTo(true)
          .merge(sources.document$.mapTo(false))
          .map(sources.changeDocumentStatus)
      ]
    }
  }
}

export default DocumentFetcher
