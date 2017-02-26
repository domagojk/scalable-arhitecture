import { requestReadme, readmeFetched, addRepo } from '../actions'

export default function (recycle, Rx) {
  recycle.feedMatchedComponents({
    requestReadme,
    readmeFetched,
    addRepo
  })
}
