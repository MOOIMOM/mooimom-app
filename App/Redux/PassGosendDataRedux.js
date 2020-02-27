import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  passGosendDataRequest: ['data'],
  passGosendDataSuccess: ['payload'],
  passGosendDataFailure: ['error'],
  logout: ['payload'],
  emptyGosendDataRequest: ['data']
})

export const PassGosendDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const PassGosendDataSelectors = {
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

export const empty = (state, action) => {
  return INITIAL_STATE
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PASS_GOSEND_DATA_REQUEST]: request,
  [Types.EMPTY_GOSEND_DATA_REQUEST]: empty,
  [Types.PASS_GOSEND_DATA_SUCCESS]: success,
  [Types.PASS_GOSEND_DATA_FAILURE]: failure,
  [Types.LOGOUT]: empty,
})
