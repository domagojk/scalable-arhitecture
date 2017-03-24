import Syncopath from 'syncopath'

export default function (recycle, Rx) {
  const action$ = new Rx.Subject()

  const syncopath = Syncopath({
    socket: new WebSocket('ws://localhost:8080'),
    collection: 'events'
  })

  syncopath.on('insert', event => {
    action$.next(event)
  })

  recycle.on('action', function (action) {
    syncopath.add(action)
  })

  return action$
}
