import React from 'react'
import ReactMarkdown from 'react-markdown'
import { sourceTypes } from 'recyclejs'

function Markdown () {
  return {
    sourceTypes: {
      documentPath$: sourceTypes.stream.isRequired,
      document$: sourceTypes.stream.isRequired,
      isFetching$: sourceTypes.stream.isRequired,
      requestDocument: sourceTypes.func.isRequired
    },

    initialState: {
      document: 'No document',
      isFetching: false,
      error: true
    },

    actions (sources) {
      return [
        sources.selectClass('retry-fetch')
          .on('click')
          .mapToLatest(sources.documentPath$)
          .map(sources.requestDocument)
      ]
    },

    reducers (sources) {
      return [
        sources.isFetching$
          .reducer(function (state, isFetching) {
            state.isFetching = isFetching
            return state
          }),

        sources.document$
          .mapToLatest(sources.document$)
          .reducer(function (state, res) {
            state.document = res.document
            state.error = res.error
            return state
          })
      ]
    },

    view (props, state) {
      const markdown = (state.isFetching) ? 'Fetching document...' : state.document

      return (
        <div>
          {state.error &&
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
