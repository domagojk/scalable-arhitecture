import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs'
import makeReactDriver from 'recyclejs/drivers/react'
import makeStoreDriver from 'recyclejs/drivers/store'
import makeActionsDriver from 'recyclejs/drivers/actions'
import config from './config'

// initialize action stream
const action$ = new Rx.Subject()
const state$ = new Rx.BehaviorSubject({
  repos: [
    { id: 1, text: 'codemirror/codemirror' },
    { id: 2, text: 'recyclejs/recycle' },
    { id: 3, text: 'bulicmatko/firepack' },
    { id: 4, text: 'will/fail' }
  ],
  lastRepoId: 4,
  activeRepo: null,
  fetchedReadme: 'Choose repository',
  isFetching: false,
  errorFetching: false
})

// initialize recycle drivers
const reactDriver = makeReactDriver(React)
const storeDriver = makeStoreDriver(state$)
const actionsDriver = makeActionsDriver(action$)

// create recycle instance
const recycle = createRecycle(Rx)

// apply drivers
recycle.applyDriver(reactDriver)
recycle.applyDriver(storeDriver)
recycle.applyDriver(actionsDriver)

// since view driver of the given module is "react"
// applyModule will return React component
const MarkdownFetcherView = recycle.applyModule(config({ state$, action$ }))

// render component
ReactDOM.render(<MarkdownFetcherView />, document.getElementById('root'))
