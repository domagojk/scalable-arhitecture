export default function (recycle, Rx) {
  const constants = {
    SHOW_REF: 'SHOW_REF',
    FETCHING: 'FETCHING',
    FETCH_DOCUMENT: 'FETCH_DOCUMENT'
  }

  const actionCreators = {
    fetchDocument: (path) => ({ type: constants.FETCH_DOCUMENT, path }),
    showRef: (ref) => ({ type: constants.SHOW_REF, ref })
  }

  recycle.feedAllComponents('actionCreators', actionCreators)

  return {
    name: 'actions',
    actionCreators,
    constants
  }
}
