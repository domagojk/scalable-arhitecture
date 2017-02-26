/* global WebSocket */
import Syncopath from 'syncopath'
import config from '../config'
import * as types from '../constants'

export default function (recycle, Rx) {
  const action$ = new Rx.Subject()

  recycle.feedMatchedComponents({
    readmeRequest$: action$.filter(a => a.type === types.REQUEST_README),
    addRepoRequests$: action$.filter(a => a.type === types.ADD_REPO),
    documentResponse$: action$.filter(a => a.type === types.README_FETCHED)
  })

  const syncopath = Syncopath({
    socket: new WebSocket(config.shareDB),
    collection: 'events'
  })

  syncopath.on('insert', event => {
    action$.next(event)
  })

  recycle.action$
    .filter(a => a.type === types[a.type])
    .subscribe(syncopath.add)
}
