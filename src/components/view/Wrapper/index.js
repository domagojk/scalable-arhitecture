/**
 * Because Markdown and RepoList are imported relatively,
 * this is not truly independent component,
 * but a part of the Domain logic.
 *
 * Somethimes this is ok, but to make it independent and scalable
 * Markdown and RepoList should be imported from npm
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
