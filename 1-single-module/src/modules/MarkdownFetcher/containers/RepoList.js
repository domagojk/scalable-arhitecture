import React from 'react'
import { repoLoadClicked, addRepoInputSubmitted } from '../../../messages'

export default {
  events (sources) {
    return [
      sources.select('button')
        .addListener('onClick')
        .map(repoLoadClicked),

      sources.select('input')
        .addListener('onKeyPress')
        .filter(e => e.key === 'Enter')
        .withLatestFrom(sources.state)
        .map(([e, state]) => state.newItemInput)
        .map(addRepoInputSubmitted)
    ]
  },

  update (sources) {
    return [
      sources.store$
        .map(s => s.repos)
        .distinctUntilChanged()
        .reducer(function (state, list) {
          state.list = list
          state.newItemInput = ''
          return state
        }),

      sources.select('input')
        .addListener('onChange')
        .reducer(function (state, e) {
          state.newItemInput = e.target.value
          return state
        }),

      sources.select('input')
        .addListener('onKeyPress')
        .filter(e => e.key === 'Enter')
        .reducer(function (state) {
          state.newItemInput = ''
          return state
        })
    ]
  },

  view (props, state) {
    return (
      <ul>
        {state.list.map(item => (
          <li key={item.id}>{item.text} <button onClick={() => item.id}>Load</button></li>
        ))}
        <li><input placeholder='Add' value={state.newItemInput} /></li>
      </ul>
    )
  }
}
