import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs/react'

import Wrapper from './components/view/Wrapper'
import effects from './components/effects'
import state from './components/state'
import actionStream from './drivers/actionStream'
import storeStream from './drivers/storeStream'
import configFeeder from './drivers/configFeeder'

// creating recycle instance
const recycle = createRecycle(React, Rx)

// applying drivers
recycle.use(actionStream, storeStream, configFeeder)

// adding Tasks
recycle.createComponent(state)
recycle.createComponent(effects)

// creating root react component
const WrapperReact = recycle.createReactComponent(Wrapper)

// rendering root react component
ReactDOM.render(<WrapperReact />, document.getElementById('root'))
