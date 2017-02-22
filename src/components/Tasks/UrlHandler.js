import { sourceTypes } from 'recyclejs'

function RefListener () {
  return {
    sourceTypes: {
      urlChange$: sourceTypes.stream.isRequired
    },

    actions (sources) {
    }
  }
}

export default RefListener
