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
      constants: sourceTypes.object.isRequired
    },

    initialState: {
      document: 'No document',
      error: true
    },

    actions (sources) {
      return [
        sources.selectClass('retry-fetch')
          .on('click')
          .mapToLatest(sources.filePath$)
          .map(sources.actionCreators.fetchDocument)
      ]
    },

    reducers (sources) {
      return [
        sources.isFetching$
          .do(console.log)
          .reducer(function (state, isFetching) {
            if (isFetching) {
              state.document = 'Fetching document...'
            }
            return state
          }),

        sources.document$
          .do(console.log)
          .reducer(function (state, res) {
            state.document = res.document
            state.error = res.error
            return state
          })
      ]
    },

    view (props, state) {
      return (
        <div>
          {state.error &&
            <div>
              <div>Error fetching document: {state.error}</div>
              <button className='retry-fetch'>Retry</button>
            </div>
          }
          <ReactMarkdown source={state.document} />
        </div>
      )
    }
  }
}

export default Markdown
