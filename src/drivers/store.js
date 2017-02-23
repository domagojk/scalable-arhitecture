export default function (recycle, Rx) {
  const test = new Rx.Subject()

  const store$ = test.startWith({
    filePath: '122'
  })

  const filePath$ = store$.map(s => s.filePath)
  recycle.feedMatchedComponents('filePath$', filePath$)

  setTimeout(function () {
    test.next({
      filePath: 'bla'
    })
  }, 1000)

  setTimeout(function () {
    test.next({
      filePath: 'bla2'
    })
  }, 2000)

  recycle.on('action', function (action) {
    test.next({
      filePath: action.path
    })
  })

  return {
    name: 'store',
    filePath$
  }
}
