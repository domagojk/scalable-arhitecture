import React from 'react'
import './style.css'
import Markdown from '../Markdown'
import RepoList from '../RepoList'

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
