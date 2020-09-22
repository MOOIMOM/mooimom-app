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
import GetMidtransStatusActions from '../Redux/GetMidtransStatusRedux'
// import { RegisterSelectors } from '../Redux/RegisterRedux'

export function* postGetMidtransStatus(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(RegisterSelectors.getData)
  // make the call to the api
  const response = yield call(api.postGetMidtransStatus, data)
  // success?
  if (response.data.success === 1) {
    if (__DEV__) console.tron.log(response)
    console.log(response.data)
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(GetMidtransStatusActions.getMidtransStatusSuccess(response.data))
  } else if (response.problem === 'TIMEOUT_ERROR') {
    var err = {
      error: {
        error_code: '0',
        error_message: 'Can not connect server now'
      }
    }
    yield put(GetMidtransStatusActions.getMidtransStatusFailure(err))
  }
  else if (response.problem === 'NETWORK_ERROR') {
    var err = {
      error: {
        error_code: '0',
        error_message: 'Can not connect server now'
      }
    }
    yield put(GetMidtransStatusActions.getMidtransStatusFailure(err))
  } else if (response.data.success === 0) {
    console.log(response.data)
    yield put(GetMidtransStatusActions.getMidtransStatusFailure(response.data))
  }
}
