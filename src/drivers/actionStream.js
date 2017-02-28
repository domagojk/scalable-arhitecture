/* global WebSocket */
import Syncopath from 'syncopath'
import config from '../config'

/**
 * Feeding components with action$ provided by recycle
 */
function localActionsFeeder (recycle, Rx) {
  recycle.feedMatchedComponents({
    action$: recycle.action$
  })
}

/**
 * Feeding components with custom action$
 * created using Syncopath (shareDB wrapper)
 */
function syncActionsFeeder (recycle, Rx) {
  const customAction$ = new Rx.Subject()

  recycle.feedMatchedComponents({
    action$: customAction$
  })

  const syncopath = Syncopath({
    socket: new WebSocket(config.sync.shareDB),
    collection: 'events'
  })

  syncopath.on('insert', event => {
    customAction$.next(event)
  })

  recycle.action$
    .subscribe(syncopath.add)
}

/**
 * Determine if should use local or "synced" version
 */
export default function (recycle, Rx) {
  if (config.sync.enable) {
    syncActionsFeeder(recycle, Rx)
  } else {
    localActionsFeeder(recycle, Rx)
  }
}
