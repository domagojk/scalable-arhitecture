import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs/react'

import Wrapper from './components/presentational/Wrapper'
import readmeFetcher from './tasks/effects'
import aggregate from './tasks/aggregate'
import drivers from './drivers'

// creating recycle instance
const recycle = createRecycle(React, Rx)

// applying drivers
recycle.use(drivers)

// adding Tasks
recycle.createComponent(aggregate)
recycle.createComponent(readmeFetcher)

// creating root react component
const WrapperReact = recycle.createReactComponent(Wrapper)

// rendering root react component
ReactDOM.render(<WrapperReact />, document.getElementById('root'))
