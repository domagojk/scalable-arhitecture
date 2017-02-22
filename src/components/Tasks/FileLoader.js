import { sourceTypes } from 'recyclejs'

function FileLoader () {
  return {
    sourceTypes: {
      filePath$: sourceTypes.stream.isRequired,
      actionCreators: sourceTypes.object.isRequired
    },

    actions (sources) {
      return [
        sources.filePath$
          .map(sources.actionCreators.fetchDocument)
      ]
    }
  }
}

export default FileLoader
