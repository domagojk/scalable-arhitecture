import React from 'react'
import ReactMarkdown from 'react-markdown'

function Markdown () {
  return {
    interface: {
      documentId$: 'observable',
      documentContent$: 'observable',
      requestDocument: 'function',
      requestLoading$: 'observable',
      requestError$: 'observable'
    },

    initialState: {
      document: '',
      isLoading: false,
      requestError: false
    },

    actions (sources) {
      return [
        sources.selectClass('retry-fetch')
          .on('click')
          .withLatestFrom(sources.documentId$)
          .map(([event, docId]) => docId)
          .map(sources.requestDocument)
      ]
    },

    update (sources) {
      return [
        sources.requestLoading$
          .reducer(function (state, isLoading) {
            state.isLoading = isLoading
            return state
          }),

        sources.documentContent$
          .reducer(function (state, document) {
            state.document = document
            return state
          }),

        sources.requestError$
          .reducer(function (state, error) {
            state.requestError = error
            return state
          })
      ]
    },

    view (props, state) {
      const document = (state.isLoading) ? 'Fetching document...' : state.document

      return (
        <div>
          {state.requestError && !state.isLoading &&
            <div>
              <div>Error fetching document: {state.requestError}</div>
              <button className='retry-fetch'>Retry</button>
            </div>
          }
          <ReactMarkdown source={document || ''} />
        </div>
      )
    }
  }
}

export default Markdown
