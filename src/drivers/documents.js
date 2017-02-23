import * as actionTypes from '../constants/ActionTypes'

function documents (recycle, Rx) {
  // stream of fetched documents
  const document$ = recycle.action$
    .filter(a => a.type === actionTypes.DOCUMENT_FETCHED)
    .map(a => a.res)

  // stream signaling when a document is fetching
  const isFetching$ = recycle.action$
    .filter(a => a.type === actionTypes.IS_FETCHING_DOCUMENT)
    .map(a => a.isFetching)

  // feeding components with created streams
  recycle.feedMatchedComponents('document$', document$)
  recycle.feedMatchedComponents('isFetching$', isFetching$)
}

export default documents
