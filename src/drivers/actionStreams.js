import * as types from '../constants'

export default function (recycle, Rx) {
  recycle.feedMatchedComponents({
    readmeRequest$: recycle.action$.filter(a => a.type === types.REQUEST_README),
    addRepoRequests$: recycle.action$.filter(a => a.type === types.ADD_REPO),
    documentResponse$: recycle.action$.filter(a => a.type === types.README_FETCHED)
  })
}
