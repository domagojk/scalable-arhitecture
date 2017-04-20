import React from 'react'
import Markdown from '../components/Markdown'
import { markdownRetryClicked } from '../../../messages'

export default {
  events (sources) {
    return [
      sources.select(Markdown)
        .addListener('onRetry')
        .withLatestFrom(sources.store$.map(s => s.activeRepo))
        .map(([event, activeRepo]) => activeRepo)
        .map(markdownRetryClicked)
    ]
  },

  update (sources) {
    return [
      sources.store$
        .reducer(function (localState, storeState) {
          return {
            fetchedReadme: storeState.fetchedReadme,
            isFetching: storeState.isFetching,
            errorFetching: storeState.errorFetching
          }
        })
    ]
  },

  view (props, state) {
    const document = (state.isFetching) ? 'Fetching document...' : state.fetchedReadme || ''
    const error = (state.errorFetching && !state.isFetching) ? state.errorFetching : false

    return <Markdown
      error={error}
      document={document || ''}
    />
  }
}
