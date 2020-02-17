/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put } from 'redux-saga/effects'
import CancelOrderActions from '../Redux/CancelOrderRedux'
// import { RegisterSelectors } from '../Redux/RegisterRedux'

export function* postCancelOrder(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(RegisterSelectors.getData)
  // make the call to the api
  const response = yield call(api.postCancelOrder, data)
  // success?
  if (response.data.success === 1) {
    if (__DEV__) console.tron.log(response)
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CancelOrderActions.cancelOrderSuccess(response.data))
  } else if (response.problem === 'TIMEOUT_ERROR') {
    var err = {
      error: {
        error_code: '0',
        error_message: 'Can not connect server now'
      }
    }
    yield put(CancelOrderActions.cancelOrderFailure(err))
  } else {
    yield put(CancelOrderActions.cancelOrderFailure(response.data))
  }
}
