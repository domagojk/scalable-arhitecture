import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Markdown from '../Markdown'
import Editor from '../Editor'

function App () {
  return (
    <div className='container-fluid'>
      <div>Header</div>
      <div className='show-grid row'>
        <div className='col-md-4 col-xs-6'><Markdown /></div>
        <div className='col-md-4 col-xs-6'><Editor /></div>
      </div>
    </div>
  )
}

export default App
