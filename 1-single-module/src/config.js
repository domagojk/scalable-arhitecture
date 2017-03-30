import { Observable } from 'rxjs/Observable'
import RequestStatus from 'scalable-arhitecture/components/reducers/RequestStatus'
import Items from 'scalable-arhitecture/components/reducers/Items'
import Ajax from 'scalable-arhitecture/components/effects/Ajax'
import App from './App'

const actionTypes = {
  REQUEST_README: 'REQUEST_README',
  README_FETCH_SUCCESS: 'README_FETCH_SUCCESS',
  README_FETCH_FAILURE: 'README_FETCH_FAILURE',
  ADD_REPO: 'ADD_REPO'
}

const actionCreators = {
  requestReadme: id => ({ type: actionTypes.REQUEST_README, id }),
  readmeFetchSuccess: payload => ({ type: actionTypes.README_FETCH_SUCCESS, payload }),
  readmeFetchFailure: payload => ({ type: actionTypes.README_FETCH_FAILURE, payload }),
  addRepo: repo => ({ type: actionTypes.ADD_REPO, repo })
}

export default ({ state$, action$ }) => ({
  state: {
    reducers: [{
      component: Items,
      sources: {
        activate$: action$
        .filter(a => a.type === actionTypes.REQUEST_README)
        .map(a => a.id),

        addItem$: action$
        .filter(a => a.type === actionTypes.ADD_REPO)
        .map(a => ({ text: a.repo })),

        deleteItem$: Observable.never()
      },
      // linkWithState
      linkWithState: {
        list: 'repos',
        lastId: 'lastRepoId',
        active: 'activeRepo'
      }
    },
    {
      component: RequestStatus,
      sources: {
        requestInit$: action$.filter(a => a.type === actionTypes.REQUEST_README),
        requestSuccess$: action$.filter(a => a.type === actionTypes.README_FETCH_SUCCESS),
        requestFailure$: action$.filter(a => a.type === actionTypes.README_FETCH_FAILURE)
      },
      linkWithState: {
        data: 'fetchedReadme',
        requestLoading: 'isFetching',
        requestError: 'errorFetching'
      }
    }]
  },

  view: {
    driver: 'react',
    root: App,
    adapterSources: {
      state$: state$,
      actionTypes,
      actionCreators
    }
  },

  effects: [{
    component: Ajax,
    sources: {
      // find README name by its id
      // using the global state
      input$: action$
        .filter(a => a.type === actionTypes.REQUEST_README)
        .withLatestFrom(state$)
        .map(([a, s]) => s.repos.filter(item => item.id === a.id))
        .map(res => res[0].text),

      debounceTime: 500,
      endpoint: path => `https://api.github.com/repos/${path}/contents/README.md?ref=master`,
      onSuccess: res => actionCreators.readmeFetchSuccess(atob(res.response.content)),
      onError: res => actionCreators.readmeFetchFailure(res.message)
    }
  }]
})
