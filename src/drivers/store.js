export default function (recycle, Rx) {
  const s$ = new Rx.Subject()
  const store$ = s$.startWith({
    filePath: 'neki'
  })

  const filePath$ = store$.map(s => s.filePath)
  recycle.feedMatchedComponents('filePath$', filePath$)

  function getCurrentState () {
    return { document: 'doc' }
  }

  return {
    name: 'store',
    getCurrentState,
    filePath$
  }
}
