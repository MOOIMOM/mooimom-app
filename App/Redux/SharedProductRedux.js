import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sharedProductRequest: ['data'],
  sharedProductSuccess: ['payload'],
  sharedProductFailure: null
})

export const SharedProductTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SharedProductSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => {
    for(var i= 0;i<state.data.length;i++){
        if(state.data[i].id === data.product.id){
          return state.merge({fetching: true, payload: null})
        }
    }
    var obj = [...state.data]
    obj.push(data.product)
    data = obj
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

export const successLogout = (state, action) => {
  return INITIAL_STATE
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHARED_PRODUCT_REQUEST]: request,
  [Types.SHARED_PRODUCT_SUCCESS]: success,
  [Types.SHARED_PRODUCT_FAILURE]: failure
})
