import * as actionCreators from '../actions'
import config from '../config'

export default function (recycle, Rx) {
  recycle.feedAllComponents('requestDocument', actionCreators.openDocument)
  recycle.feedAllComponents('documentFetched', actionCreators.documentFetched)
  recycle.feedAllComponents('changeDocumentStatus', actionCreators.isFetchingDocument)
  recycle.feedAllComponents('addRepo', actionCreators.addRepo)
  recycle.feedAllComponents('getDocumentEndpoint', config.documentEndpoint)
}
