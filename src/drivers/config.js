import config from '../config'

export default function (recycle, Rx) {
  recycle.feedAllComponents('getUrl', config.documentEndpoint)
}
