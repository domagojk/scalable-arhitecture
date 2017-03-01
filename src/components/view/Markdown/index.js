import React from 'react'
import ReactMarkdown from 'react-markdown'
import { sourceTypes } from 'recyclejs'

function Markdown () {
  return {
    sourceTypes: {
      store$: sourceTypes.observable.isRequired,
      actionCreators: sourceTypes.object.isRequired
    },

    initialState: {
      document: 'No document',
      isFetching: false,
      error: false
    },

    actions (sources) {
      return [
        sources.selectClass('retry-fetch')
          .on('click')
          .mapToLatest(sources.store$.map(s => s.repoName))
          .map(sources.actionCreators.requestReadme)
      ]
    },

    reducers (sources) {
      return [
        sources.store$
          .map(s => s.isFetching)
          .distinctUntilChanged()
          .reducer(function (state, isFetching) {
            state.isFetching = isFetching
            return state
          }),

        sources.store$
          .map(s => s.readme)
          .distinctUntilChanged()
          .reducer(function (state, document) {
            state.document = document
            return state
          }),

        sources.store$
          .map(s => s.errorFetching)
          .distinctUntilChanged()
          .reducer(function (state, error) {
            state.error = error
            return state
          })
      ]
    },

    view (props, state) {
      const markdown = (state.isFetching) ? 'Fetching document...' : state.document

      return (
        <div>
          {state.error && !state.isFetching &&
            <div>
              <div>Error fetching document: {state.error}</div>
              <button className='retry-fetch'>Retry</button>
            </div>
          }
          <ReactMarkdown source={markdown} />
        </div>
      )
    }
  }
}

export default Markdown
