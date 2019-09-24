import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addWishlistRequest: ['data'],
  deleteWishlistRequest: ['data'],
  editWishlistSuccess: ['payload'],
  editWishlistFailure: ['error'],
})

export const EditWishlistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const EditWishlistSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({ fetching: false, error: error, payload: null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_WISHLIST_REQUEST]: request,
  [Types.DELETE_WISHLIST_REQUEST]: request,
  [Types.EDIT_WISHLIST_SUCCESS]: success,
  [Types.EDIT_WISHLIST_FAILURE]: failure,
})
