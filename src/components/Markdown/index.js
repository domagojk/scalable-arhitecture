import React from 'react'
import ReactMarkdown from 'react-markdown'
import { sourceTypes } from 'recyclejs'

/*
razbijanje statea na posebne streamove
  - izloiranost
  - netreba shouldComponentUpdate (u sourceu se gleda)
    pa ako je 10 komponenti ovismo u streamu, samo je jedna
    provjera a ne 10

USPOREDBA SA REDUX/REACT
propsi
  - REDUX: većina App logic-a
  - RECYCLE: samo konfiguracijski parametri (nikad app logic)
sources
  - REDUX: nema
  - RECYCLE: svojevrsni props (drugi ulaz) za App logic
initialState
  - isto
actions
  - REDUX: render (view) -> props -> container dispatcher -> redux
  - RECYCLE: return actions stream -> driver -> ?
reducers
  - REDUX: promjena na setState ako je lokalna, inače propsi
  - RECYCLE: promjena statea na neki od sourca, lokalni ili vanjski
view
  - REDUX: view/logic
  - RECYCLE: pure view

*/

function Markdown () {
  return {
    sourceTypes: {
      filePath$: sourceTypes.stream.isRequired,
      document$: sourceTypes.stream.isRequired,
      isFetching$: sourceTypes.stream.isRequired,
      actionCreators: sourceTypes.object.isRequired,
      actionTypes: sourceTypes.object.isRequired
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
          .mapToLatest(sources.filePath$)
          .map(sources.actionCreators.openDocument)
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
