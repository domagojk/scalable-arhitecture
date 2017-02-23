import config from '../config'

function documents (recycle, Rx) {
  // stream of filePath changes in store
  const filePath$ = recycle.getDriver('store').filePath$

  // stream of fetched documents
  const document$ = new Rx.Subject()

  // stream signaling when a document is fetching
  const isFetching$ = Rx.Observable.merge(
    filePath$.mapTo(true),
    document$.mapTo(false)
  )

  // stream with side-effect of ajax request (fetching doc)
  // dumping its result to document$
  filePath$
    .share()
    .switchMap(path => Rx.Observable.ajax(`${config.url}/${path}`)
      .map(res => ({ error: false, document: 'fetched doc' }))
      .catch(err => Rx.Observable.of({ error: err.message, document: '' }))
    )
    .subscribe(document$)

  // feeding components with created streams
  recycle.feedMatchedComponents('document$', document$)
  recycle.feedMatchedComponents('isFetching$', isFetching$)
}

export default documents
