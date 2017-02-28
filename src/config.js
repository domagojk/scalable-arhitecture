const config = {
  actionTypes: {
    REQUEST_README: 'REQUEST_README',
    README_FETCHED: 'README_FETCHED',
    ADD_REPO: 'ADD_REPO'
  },
  actionCreators: {
    requestReadme: path => ({ type: config.actionTypes.REQUEST_README, path }),
    readmeFetched: res => ({ type: config.actionTypes.README_FETCHED, res }),
    addRepo: repo => ({ type: config.actionTypes.ADD_REPO, repo })
  },
  getReadmeEndpoint: path => `https://api.github.com/repos/${path}/contents/README.md?ref=master`,
  sync: {
    enable: false,
    shareDB: 'ws://localhost:8080'
  }
}

export default config
