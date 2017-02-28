import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs/react'

import App from './components/presentational/App'
import readmeFetcher from './tasks/effects'
import aggregate from './tasks/aggregate'
import actionStream from './drivers/actionStream'
import storeStream from './drivers/storeStream'
import configFeeder from './drivers/configFeeder'

// creating recycle instance
const recycle = createRecycle(React, Rx)

// applying drivers
recycle.use(actionStream, storeStream, configFeeder)

// adding Tasks
recycle.createComponent(aggregate)
recycle.createComponent(readmeFetcher)

// creating root react component
const AppReact = recycle.createReactComponent(App)

// rendering root react component
ReactDOM.render(<AppReact />, document.getElementById('root'))
