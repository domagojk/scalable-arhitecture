import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Markdown from './adapters/Markdown'
import RepoList from './adapters/RepoList'

const documentStyle = {
  margin: 10,
  padding: 10,
  border: '2px solid black'
}

const App = () => (
  <div>
    <div>
      <RepoList />
    </div>
    <div style={documentStyle}>
      <Markdown />
    </div>
  </div>
)

export default App
