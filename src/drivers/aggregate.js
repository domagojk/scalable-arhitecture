function aggregateDriver (recycle, Rx) {
  const store$ = new Rx.Subject()

  const filePath$ = store$.map(s => s.filePath)
    .distinctUntilChanged()

  const repos$ = store$.map(s => s.repos)

  recycle.feedMatchedComponents('filePath$', filePath$)
  recycle.feedMatchedComponents('repos$', repos$)

  recycle.on('sourcesReady', function (c) {
    if (c.get('aggregator')) {
      setTimeout(() => {
        c.getStateStream()
          .map(res => res.state)
          .startWith(c.get('initialState'))
          .subscribe(function (state) {
            store$.next(state)
            c.replaceState(state)
          })
      })
    }
  })
}

export default aggregateDriver
