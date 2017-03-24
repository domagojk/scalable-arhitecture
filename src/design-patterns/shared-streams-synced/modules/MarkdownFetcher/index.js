import Markdown from '../../components/view/Markdown'
import DynamicList from '../../components/view/DynamicList'
import RequestStatus from '../../components/store/RequestStatus'
import Items from '../../components/store/Items'
import Ajax from '../../components/effects/Ajax'

import App from './App'
import { REQUEST_README, README_FETCHED, ADD_REPO } from './actionTypes'
import { requestReadme, readmeFetched, addRepo } from './actionCreators'

export default ({ store$, action$, Rx }) => ({
  root: App,

  view: [
    {
      component: DynamicList,
      sources: {
        list$: store$.map(s => s.repos).distinctUntilChanged(),
        buttonLabel: 'load',
        onButtonClicked: requestReadme,
        onNewItem: addRepo
      }
    },
    {
      component: Markdown,
      sources: {
        documentId$: store$
          .map(s => s.activeRepo)
          .distinctUntilChanged(),

        documentContent$: store$
          .map(s => s.fetchedReadme)
          .distinctUntilChanged(),

        requestLoading$: store$
          .map(s => s.isFetching)
          .distinctUntilChanged(),

        requestError$: store$
          .map(s => s.errorFetching)
          .distinctUntilChanged(),

        refreshContent: requestReadme
      }
    }
  ],

  // use following components as aggregators
  // which will modify the project store
  store: [
    {
      component: RequestStatus,
      sources: {
        requestInit$: action$.filter(a => a.type === REQUEST_README),
        requestComplete$: action$.filter(a => a.type === README_FETCHED),
        parseError: (action) => action.res.error,
        parseData: (action) => action.res.document,
        initialState: {
          requestLoading: false,
          requestError: false,
          data: 'Choose repository'
        }
      },
      modify: {
        fetchedReadme: s => s.data,
        isFetching: s => s.requestLoading,
        errorFetching: s => s.requestError
      }
    },
    {
      component: Items,
      sources: {
        activate$: action$
          .filter(a => a.type === REQUEST_README)
          .map(a => a.id),

        addItem$: action$
          .filter(a => a.type === ADD_REPO)
          .map(a => ({ text: a.repo })),

        deleteItem$: Rx.Observable.never(),

        initialState: {
          list: [
            { id: 1, text: 'codemirror/codemirror' },
            { id: 2, text: 'recyclejs/recycle' },
            { id: 3, text: 'bulicmatko/firepack' },
            { id: 4, text: 'will/fail' }
          ],
          lastId: 4
        }
      },
      modify: {
        activeRepo: s => s.active,
        repos: s => s.list
      }
    }
  ],

  // components performing side-effects
  effects: [
    {
      component: Ajax,
      sources: {
        // find README name by its id
        // using the global state
        input$: action$
          .filter(a => a.type === REQUEST_README)
          .withLatestFrom(store$.map(s => s.repos))
          .map(([a, s]) => s.filter(item => item.id === a.id))
          .map(res => res[0].text),

        debounceTime: 500,
        endpoint: path => `https://api.github.com/repos/${path}/contents/README.md?ref=master`,
        onSuccess: res => ({ error: false, document: atob(res.response.content) }),
        onError: err => ({ error: err.message, document: '' }),
        outputActionType: readmeFetched
      }
    }
  ]
})
