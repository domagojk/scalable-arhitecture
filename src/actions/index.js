import * as types from '../constants/ActionTypes'

export const openDocument = (path) => ({ type: types.OPEN_DOCUMENT, path })
export const addRepo = (repo) => ({ type: types.ADD_REPO, repo })
export const documentFetched = res => ({ type: types.DOCUMENT_FETCHED, res })
export const isFetchingDocument = isFetching => ({ type: types.IS_FETCHING_DOCUMENT, isFetching })
export const showRef = (ref) => ({ type: types.SHOW_REF, ref })
