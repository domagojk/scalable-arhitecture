import { MARKDOWN_RETRY_CLICKED, REPO_LOAD_CLICKED, ADD_REPO_INPUT_SUBMITTED } from './constants'

export default function (modules, event) {
  switch (event.type) {
    case MARKDOWN_RETRY_CLICKED:
    case REPO_LOAD_CLICKED:
      modules.markdownFetcher.fetchMarkdown(event.id)
      break

    case ADD_REPO_INPUT_SUBMITTED:
      modules.markdownFetcher.addRepo(event.repo)
      break

    default:
      return false
  }
}
