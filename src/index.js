import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs/react'

import Wrapper from './components/Wrapper'
import DocumentFetcher from './tasks/DocumentFetcher'
import StateAggregator from './tasks/StateAggregator'
import drivers from './drivers'

// creating recycle instance
const recycle = createRecycle(React, Rx)

// applying drivers
recycle.use(drivers)

// creating root react component
const WrapperReact = recycle.createReactComponent(Wrapper)

// adding Tasks
recycle.createComponent(DocumentFetcher)
recycle.createComponent(StateAggregator)

// rendering root react component
ReactDOM.render(<WrapperReact />, document.getElementById('root'))
