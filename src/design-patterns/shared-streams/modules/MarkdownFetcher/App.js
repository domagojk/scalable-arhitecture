import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Markdown from '../../components/view/Markdown'
import DynamicList from '../../components/view/DynamicList'

const documentStyle = {
  margin: 10,
  padding: 10,
  border: '2px solid black'
}

const App = () => (
  <div>
    <div className='repo-list'>
      <DynamicList />
    </div>
    <div style={documentStyle}>
      <Markdown />
    </div>
  </div>
)

export default App
