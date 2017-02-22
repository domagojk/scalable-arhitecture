import config from '../config'

function getDriver (recycle, Rx) {
  const store = recycle.getDriver('store')

  const document$ = store.filePath$
    .switchMap(path => Rx.Observable.ajax(`${config.url}/${path}`)
      .map(res => ({ error: false, document: res }))
      .catch(err => [{ error: err.message, document: '' }])
    )

  const isFetching$ = store.filePath$.mapTo(true)
    .merge(document$.mapTo(false))

  recycle.feedMatchedComponents('document$', document$)
  recycle.feedMatchedComponents('isFetching$', isFetching$)
}

export default getDriver
