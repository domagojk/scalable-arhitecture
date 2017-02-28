import createStore from 'recyclejs/drivers/store'

export default function (recycle, Rx) {
  const { store$ } = createStore(recycle, Rx)

  recycle.feedMatchedComponents({
    store$
  })
}
