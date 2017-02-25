import * as actionTypes from '../constants/ActionTypes'

export default function (recycle, Rx) {
  const action$ = recycle.action$.filter(a => a.type === actionTypes[a.type])

  recycle.feedMatchedComponents('action$', action$)
  recycle.feedMatchedComponents('openDocumentRequests$', action$.filterByType(actionTypes.OPEN_DOCUMENT))
  recycle.feedMatchedComponents('addRepoRequests$', action$.filterByType(actionTypes.ADD_REPO))
  recycle.feedMatchedComponents('document$', action$.filterByType(actionTypes.DOCUMENT_FETCHED).map(a => a.res))
  recycle.feedMatchedComponents('isFetching$', action$.filterByType(actionTypes.IS_FETCHING_DOCUMENT).map(a => a.isFetching))
}
