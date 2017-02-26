import config from '../config'

export default function (recycle, Rx) {
  recycle.feedMatchedComponents({
    getReadmeEndpoint: config.getReadmeEndpoint
  })
}
