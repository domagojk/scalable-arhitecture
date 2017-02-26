import * as types from './constants'

export const requestReadme = path => ({ type: types.REQUEST_README, path })
export const readmeFetched = res => ({ type: types.README_FETCHED, res })
export const addRepo = repo => ({ type: types.ADD_REPO, repo })
