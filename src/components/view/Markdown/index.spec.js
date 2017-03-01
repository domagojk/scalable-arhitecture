/* global describe it expect */
import Markdown from './Markdown'
import { streamToPromise, applyReducer } from 'recyclejs/testutils'
import streamAdapter from 'recyclejs/adapter/rxjs'
import Rx from 'rxjs/Rx'
streamAdapter(Rx)

describe('Markdown actions', function () {
  it('should dispach action', function () {
    const clicks$ = new Rx.Subject()
    const actions$ = Rx.Observable.merge(
      ...Markdown().actions({
        selectClass: selector => ({ on: event => clicks$ }),
        store$: Rx.Observable.of({ repoName: 'repoName' }),
        requestReadme: (repo) => ({ type: 'retry-action', repo })
      })
    )

    return streamToPromise(actions$, () => clicks$.next('event'))
      .then(a => expect(a).toEqual({ type: 'retry-action', repo: 'repoName' }))
  })
})

describe('Markdown Reducers', function () {
  it('should change state', function () {
    let state = {
      document: 'No document',
      isFetching: true,
      error: true
    }

    const store$ = new Rx.Subject()
    const reducer$ = Rx.Observable.merge(
      ...Markdown().reducers({ store$ })
    )

    reducer$.subscribe(function (res) {
      state = applyReducer(res, state)
    })

    store$.next({
      isFetching: false,
      errorFetching: false,
      readme: 'something'
    })

    return expect(state).toEqual({ document: 'something', isFetching: false, error: false })
  })
})
