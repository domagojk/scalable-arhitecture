import {
  REPO_ADDED,
  MARKDOWN_FETCH_STARTED,
  README_FETCH_SUCCEEDED,
  README_FETCH_FAILED
} from '../../../constants'

const initialState = {
  repos: [
    { id: 1, text: 'codemirror/codemirror' },
    { id: 2, text: 'recyclejs/recycle' },
    { id: 3, text: 'bulicmatko/firepack' },
    { id: 4, text: 'will/fail' }
  ],
  lastRepoId: 4,
  activeRepo: null,
  fetchedReadme: 'Choose repository',
  isFetching: false,
  errorFetching: false
}

export default function (state = initialState, event) {
  switch (event.type) {
    case REPO_ADDED:
      state.lastRepoId += 1
      state.repos = [...state.repos, { text: event.repo, id: state.lastRepoId }]
      return state

    case MARKDOWN_FETCH_STARTED:
      state.isFetching = true
      state.activeRepo = event.id
      return state

    case README_FETCH_SUCCEEDED:
      state.isFetching = false
      state.errorFetching = false
      state.fetchedReadme = event.payload
      return state

    case README_FETCH_FAILED:
      state.isFetching = false
      state.errorFetching = event.payload
      state.fetchedReadme = null
      return state

    default:
      return state
  }
}
