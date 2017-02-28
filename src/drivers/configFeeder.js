import config from '../config'

export default function (recycle, Rx) {
  recycle.feedMatchedComponents({
    actionCreators: config.actionCreators,
    actionTypes: config.actionTypes,
    getReadmeEndpoint: config.getReadmeEndpoint
  })
}
