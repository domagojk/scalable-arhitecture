import * as constants from './constants'

// events
export const readmeFetchSucceeded = payload => ({ type: constants.README_FETCH_SUCCEEDED, payload })
export const readmeFetchFailed = payload => ({ type: constants.README_FETCH_FAILED, payload })
export const markdownRetryClicked = id => ({ type: constants.MARKDOWN_RETRY_CLICKED, id })
export const repoLoadClicked = id => ({ type: constants.REPO_LOAD_CLICKED, id })
export const addRepoInputSubmitted = repo => ({ type: constants.ADD_REPO_INPUT_SUBMITTED, repo })
export const repoAdded = event => ({ type: constants.REPO_ADDED, repo: event.repo })
export const markdownFetchStarted = event => ({ type: constants.MARKDOWN_FETCH_STARTED, id: event.id })

// commands
export const fetchMarkdown = (id) => ({ type: constants.FETCH_MARKDOWN, id })
export const addRepo = repo => ({ type: constants.ADD_REPO, repo })
