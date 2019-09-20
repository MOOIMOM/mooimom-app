import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendOtpRequest: ['data'],
  sendOtpSuccess: ['payload'],
  sendOtpFailure: ['error'],
  logout: ['payload'],
})

export const SendOtpTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SendOtpSelectors = {
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
export const successLogout = (state, action) => {
  return INITIAL_STATE
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_OTP_REQUEST]: request,
  [Types.SEND_OTP_SUCCESS]: success,
  [Types.SEND_OTP_FAILURE]: failure,
  [Types.LOGOUT]: successLogout
})
