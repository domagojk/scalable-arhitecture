import React from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rxjs/Rx'
import processManager from './processManager'
import MarkdownFetcherModule from './modules/MarkdownFetcher'

/**
 * EVENT STORE
 * event store represented as
 * stream of events
 */
const event$ = new Rx.Subject()

/**
 * MODULE
 * collection of components
 */
const modules = {
  markdownFetcher: MarkdownFetcherModule(event$)
}

/**
 * PROCESS MANAGER
 * listens to all events
 * and invokes commands
 */
event$.subscribe(event => processManager(modules, event))

const MarkdownFetcher = modules.markdownFetcher.getRootComponent()
ReactDOM.render(<MarkdownFetcher />, document.getElementById('root'))
