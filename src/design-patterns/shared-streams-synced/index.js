import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs'

import reactDriver from 'recyclejs/drivers/react'


import MarkdownFetcher from './modules/MarkdownFetcher'
import Todos from './modules/Todos'

const action$ = new Rx.Subject()
const store$ = new Rx.Subject()
const store = {}
const aggregators = []

function globalStoreDriver (recycle, Rx) {
  recycle.on('sourcesReady', function (c) {
    const modifyStore = c.getPrivate('modifyStore')
    if (!modifyStore) {
      return
    }

    let initialState = c.get('initialState')
    if (typeof initialState === 'function') {
      initialState = initialState(c.getSources())
    }

    Object.keys(modifyStore).forEach(key => {
      if (store[key] !== undefined) {
        throw new Error(`${key} is already modified by another store component`)
      }
      store[key] = modifyStore[key](initialState)
    })
    aggregators.push(c)
  })

  recycle.on('componentsInitalized', function () {
    Rx.Observable.merge(...aggregators.map(c => c.getStateStream().map(res => [res, c])))
      .map(([res, c]) => {
        const modifyStore = c.getPrivate('modifyStore')
        const calcState = {}
        Object.keys(modifyStore).forEach(key => {
          calcState[key] = modifyStore[key](res.state)
        })
        return calcState
      })
      .startWith(store)
      .scan((acc, curr) => {
        return Object.assign({}, acc, curr)
      })
      .subscribe(store$)
  })
}

function globalActionsDriver (recycle, Rx) {
  recycle.on('action', function (action) {
    action$.next(action)
  })
}

const createModule = function (module) {
  // create recycle instance
  const recycle = createRecycle(Rx)

  // apply drivers
  const recycleReact = recycle.applyDriver(reactDriver(React))
  recycle.applyDriver(globalStoreDriver)
  recycle.applyDriver(globalActionsDriver)

  // define project API for each module
  const projectApi = { store$, action$, Rx }

  const rootComponent = recycle.applyModule(module(projectApi))
  return recycleReact.createReactComponent(rootComponent)
}

const TodosReact = createModule(Todos)
const MarkdownFetcherReact = createModule(MarkdownFetcher)

ReactDOM.render(<div>
  <MarkdownFetcherReact />
  <TodosReact />
</div>, document.getElementById('root'))
