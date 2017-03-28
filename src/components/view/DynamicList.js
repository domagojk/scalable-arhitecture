import React from 'react'

function DynamicList () {
  return {
    interface: {
      list$: 'observable',
      onNewItem: 'function',
      buttonLabel: 'string',
      onButtonClicked: 'function'
    },

    initialState: (sources) => ({
      buttonLabel: sources.buttonLabel,
      newItemInput: '',
      list: []
    }),

    actions (sources) {
      return [
        sources.select('button')
          .on('click')
          .map(sources.onButtonClicked),

        sources.select('input')
          .on('keyPress')
          .filter(e => e.key === 'Enter')
          .withLatestFrom(sources.state)
          .map(([e, state]) => state.newItemInput)
          .map(sources.onNewItem)
      ]
    },

    update (sources) {
      return [
        sources.list$
          .reducer(function (state, list) {
            state.list = list
            state.newItemInput = ''
            return state
          }),

        sources.select('input')
          .on('change')
          .reducer(function (state, e) {
            state.newItemInput = e.target.value
            return state
          }),

        sources.select('input')
          .on('keyPress')
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
            <li key={item.id}>{item.text} <button return={item.id}>{state.buttonLabel}</button></li>
          ))}
          <li><input placeholder='Add' value={state.newItemInput} /></li>
        </ul>
      )
    }
  }
}

export default DynamicList
