import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addBankAccountRequest: ['data'],
  editBankAccountRequest: ['data'],
  deleteBankAccountRequest: ['data'],
  editBankAccountSuccess: ['payload'],
  editBankAccountFailure: ['error'],
})

export const EditBankAccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const EditBankAccountSelectors = {
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
  [Types.ADD_BANK_ACCOUNT_REQUEST]: request,
  [Types.EDIT_BANK_ACCOUNT_REQUEST]: request,
  [Types.DELETE_BANK_ACCOUNT_REQUEST]: request,
  [Types.EDIT_BANK_ACCOUNT_SUCCESS]: success,
  [Types.EDIT_BANK_ACCOUNT_FAILURE]: failure,
})
