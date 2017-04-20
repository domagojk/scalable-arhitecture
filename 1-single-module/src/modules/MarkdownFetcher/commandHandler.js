import Rx from 'rxjs/Rx'
import { readmeFetchSucceeded, readmeFetchFailed, markdownFetchStarted, repoAdded } from '../../messages'
import { ADD_REPO, FETCH_MARKDOWN } from '../../constants'

export default function (command$, store$) {
  return [
    command$.ofType(ADD_REPO)
      .map(repoAdded),

    command$.ofType(FETCH_MARKDOWN)
      .map(markdownFetchStarted),

    command$.ofType(FETCH_MARKDOWN)
      .withLatestFrom(store$)
      .map(([command, store]) => store.repos.filter(i => i.id === command.id))
      .map(filteredRepos => filteredRepos[0].text)
      .debounceTime(500)
      .switchMap(path => Rx.Observable.ajax(`https://api.github.com/repos/${path}/contents/README.md?ref=master`)
        .map(res => readmeFetchSucceeded(atob(res.response.content)))
        .catch(err => Rx.Observable.of(readmeFetchFailed(err.message)))
      )
  ]
}
