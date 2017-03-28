import React from 'react'
import Rx from 'rxjs/Rx'
import createRecycle from 'recyclejs'
import makeReactDriver from 'recyclejs/drivers/react'
import makeStoreDriver from 'recyclejs/drivers/store'
import makeActionsDriver from 'recyclejs/drivers/actions'

import MarkdownFetcherModule from './MarkdownFetcher'
import TodosModule from './Todos'

// initialize action stream
const action$ = new Rx.Subject()
const state$ = new Rx.BehaviorSubject({})

// initialize recycle drivers
const reactDriver = makeReactDriver(React)
const storeDriver = makeStoreDriver(state$)
const actionsDriver = makeActionsDriver(action$)

function createModule (mod) {
  // create recycle instance
  const recycle = createRecycle(Rx)

  // apply drivers
  recycle.applyDriver(reactDriver)
  recycle.applyDriver(storeDriver)
  recycle.applyDriver(actionsDriver)

  // since view driver of the given module is "react"
  // applyModule will return React component
  return recycle.applyModule(mod({ state$, action$ }))
}

export const MarkdownFetcher = createModule(MarkdownFetcherModule)
export const Todos = createModule(TodosModule)
