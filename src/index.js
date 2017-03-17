import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs'
import reactDriver from 'recyclejs/drivers/react'
// components
import Wrapper from './components/view/Wrapper'
import ReadmeFetcher from './components/effects/ReadmeFetcher'
import FetchingStatus from './components/state/FetchingStatus'
import Repos from './components/state/Repos'
// drivers
import actionStream from './drivers/actionStream'
import storeStream from './drivers/storeStream'
import configFeeder from './drivers/configFeeder'

// creating recycle instance
const recycle = createRecycle(Rx)
// applying drivers
recycle.use(reactDriver(React))
recycle.use(actionStream, storeStream, configFeeder)

// effects
recycle.createComponent(ReadmeFetcher)
// state
recycle.createComponent(FetchingStatus)
recycle.createComponent(Repos)
// view
const WrapperReact = recycle.createReactComponent(Wrapper)

// rendering root react component
ReactDOM.render(<WrapperReact />, document.getElementById('root'))
