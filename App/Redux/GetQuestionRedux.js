import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getQuestionRequest: ['data'],
  getQuestionSuccess: ['payload'],
  getQuestionFailure: ['error'],
})

export const GetQuestionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GetQuestionSelectors = {
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
  [Types.GET_QUESTION_REQUEST]: request,
  [Types.GET_QUESTION_SUCCESS]: success,
  [Types.GET_QUESTION_FAILURE]: failure,
})
