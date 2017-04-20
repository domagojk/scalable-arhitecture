import React from 'react'
import Rx from 'rxjs/Rx'
import { createStore } from 'redux'
import createModule from 'recycle'
import makeReactExtension from 'recycle/extensions/react'
import makeReduxExtension from 'recycle/extensions/redux'
import rootReducer from './reducers'
import commandHandler from './commandHandler'
import App from './components/App'
import { fetchMarkdown, addRepo } from '../../messages'

export default event$ => createModule({
  adapter: Rx,
  extensions: [
    makeReactExtension(React),
    makeReduxExtension(createStore(rootReducer))
  ],
  eventStore: event$,
  commandHandler,
  api: recycle => ({
    getRootComponent: () => recycle.createReactComponent(App),
    fetchMarkdown: id => recycle.sendCommand(fetchMarkdown(id)),
    addRepo: id => recycle.sendCommand(addRepo(id))
  })
})
