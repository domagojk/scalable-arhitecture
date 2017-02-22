import React from 'react'
import Rx from 'rxjs/Rx'
import ReactDOM from 'react-dom'
import createRecycle from 'recyclejs/react'
import Wrapper from './components/Wrapper'
import UrlHandler from './components/Tasks/UrlHandler'
import FileLoader from './components/Tasks/FileLoader'
import actions from './drivers/actions'
import store from './drivers/store'
import getDocument from './drivers/getDocument'

// creating recycle instance
const recycle = createRecycle(React, Rx)

// applying drivers
recycle.use(actions, store, getDocument)

// creating recycle components
const WrapperReact = recycle.createReactComponent(Wrapper)
recycle.createComponent(UrlHandler)
recycle.createComponent(FileLoader)

// rendering root react component
ReactDOM.render(<WrapperReact />, document.getElementById('root'))
