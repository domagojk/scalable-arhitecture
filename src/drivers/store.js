function aggregateDriver (recycle, Rx) {
  const store$ = new Rx.Subject()

  recycle.feedMatchedComponents('documentPath$', store$.map(s => s.documentPath).distinctUntilChanged())
  recycle.feedMatchedComponents('repos$', store$.map(s => s.repos))

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
