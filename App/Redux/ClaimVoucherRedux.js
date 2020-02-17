import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  claimVoucherRequest: ['data'],
  claimVoucherSuccess: ['payload'],
  claimVoucherFailure: ['error'],
  logout: ['payload'],
  emptyVoucherRequest: ['data']
})

export const ClaimVoucherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ClaimVoucherSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => {
  return state.merge({ fetching: true, data, payload: null })
}

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
  [Types.CLAIM_VOUCHER_REQUEST]: request,
  [Types.EMPTY_VOUCHER_REQUEST]: empty,
  [Types.CLAIM_VOUCHER_SUCCESS]: success,
  [Types.CLAIM_VOUCHER_FAILURE]: failure,
  [Types.LOGOUT]: empty,
})
