/* global WebSocket */
import Syncopath from 'syncopath'
import config from '../config'
import * as types from '../constants'
import * as actionCreators from '../actions'

export default function (recycle, Rx) {
  const action$ = new Rx.Subject()

  recycle.feedMatchedComponents({
    action$,
    actionCreators,
    actionTypes: types
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
