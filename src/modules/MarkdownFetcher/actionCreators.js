import { REQUEST_README, README_FETCHED, ADD_REPO } from './actionTypes'

export const requestReadme = id => ({ type: REQUEST_README, id })
export const readmeFetched = res => ({ type: README_FETCHED, res })
export const addRepo = repo => ({ type: ADD_REPO, repo })
