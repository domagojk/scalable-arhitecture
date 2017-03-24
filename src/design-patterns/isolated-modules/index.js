import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs'

import reactDriver from 'recyclejs/drivers/react'
import storeDriver from 'recyclejs/drivers/store'
import actionsDriver from 'recyclejs/drivers/actions'

import MarkdownFetcher from './modules/MarkdownFetcher'
import Todos from './modules/Todos'

const createModule = function (module) {
  // create recycle instance
  const recycle = createRecycle(Rx)

  // apply drivers
  const recycleReact = recycle.applyDriver(reactDriver(React))
  const store$ = recycle.applyDriver(storeDriver)
  const action$ = recycle.applyDriver(actionsDriver)

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
