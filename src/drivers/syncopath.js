/* global WebSocket */
import Syncopath from 'syncopath'
import config from '../config'
import * as actionTypes from '../constants/ActionTypes'

function syncopathDriver (recycle, Rx) {
  const event$ = new Rx.Subject()

  recycle.feedMatchedComponents('event$', event$)

  const syncopath = Syncopath({
    socket: new WebSocket(config.shareDB),
    collection: 'events'
  })

  syncopath.on('insert', event => {
    event$.next(event)
  })

  recycle.on('action', function (action) {
    if (action.type === actionTypes[action.type]) {
      syncopath.add(action)
    }
  })
}

export default syncopathDriver
