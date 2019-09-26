import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addCartRequest: ['data'],
  addCartSuccess: ['payload'],
  addCartFailure: ['error'],
  logout: ['payload'],
  emptyCartRequest: ['data']
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CartSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => {
    for(var i= 0;i<state.data.length;i++){
        if(state.data[i].sku === data.sku){
          var obj = [...state.data]
          if(data.qty === 0){
            obj.splice(i, 1)
          } else {
            obj[i] = data
          }
          data = obj
          return state.merge({fetching: true, data, payload: null})
        }
    }
    var obj = [...state.data]
    obj.push(data)
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

export const empty = (state, action) => {
  return INITIAL_STATE
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_CART_REQUEST]: request,
  [Types.EMPTY_CART_REQUEST]: empty,
  [Types.ADD_CART_SUCCESS]: success,
  [Types.ADD_CART_FAILURE]: failure,
  [Types.LOGOUT]: empty,
})
