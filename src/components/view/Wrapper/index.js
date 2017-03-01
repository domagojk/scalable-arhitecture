/**
 * This is not truly independent component
 * because it's importing Markdown and RepoList relatively.
 * Because of that, it's a part of the Domain logic
 *
 * Somethimes this is ok, but to make it scalable
 * it's prefered for Markdown and RepoList to be imported from npm
 */
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
