import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs/react'

import Wrapper from './components/Wrapper'
import actions from './drivers/actions'
import store from './drivers/store'
import documents from './drivers/documents'

// creating recycle instance
const recycle = createRecycle(React, Rx)

// applying drivers
recycle.use(actions, store, documents)

// creating recycle components
const WrapperReact = recycle.createReactComponent(Wrapper)

// rendering root react component
ReactDOM.render(<WrapperReact />, document.getElementById('root'))
