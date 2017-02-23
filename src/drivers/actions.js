import * as actionTypes from '../constants/ActionTypes'
import * as actionCreators from '../actions'

export default function (recycle, Rx) {
  recycle.feedAllComponents('actionCreators', actionCreators)
  recycle.feedAllComponents('actionTypes', actionTypes)
}
