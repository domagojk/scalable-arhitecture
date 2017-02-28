import * as actionCreators from '../actions'
import * as types from '../constants'

export default function (recycle, Rx) {
  recycle.feedMatchedComponents({
    action$: recycle.action$,
    actionCreators,
    actionTypes: types
  })
}
