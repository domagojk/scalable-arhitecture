import React from 'react'
import './style.css'
import Markdown from '../containers/Markdown'
import RepoList from '../containers/RepoList'

function App () {
  return (
    <div>
      <div className='repo-list'>
        <RepoList />
      </div>
      <div className='document'>
        <Markdown />
      </div>
    </div>
  )
}

export default App
