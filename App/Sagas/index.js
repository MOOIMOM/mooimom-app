import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { SharedProductTypes } from '../Redux/SharedProductRedux'
import { SignUpTypes } from '../Redux/SignUpRedux'
import { SendOtpTypes } from '../Redux/SendOtpRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { GetHomepageTypes } from '../Redux/GetHomepageRedux'
import { GetProductTypes } from '../Redux/GetProductRedux'
import { CartTypes } from '../Redux/CartRedux'
import { AddressTypes } from '../Redux/AddressRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { saveSharedProduct } from './SharedProductSagas'
import { postSignUp } from './SignUpSagas'
import { postSendOtp } from './SendOtpSagas'
import { postLogin } from './LoginSagas'
import { postAuth } from './AuthSagas'
import { postGetHomepage } from './GetHomepageSagas'
import { postGetProduct } from './GetProductSagas'
import { postGetProductVariation } from './GetProductVariationSagas'
import { addCart } from './AddCartSagas'
import { postGetAddress } from './GetAddressSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(SharedProductTypes.SHARED_PRODUCT_REQUEST, saveSharedProduct),
    takeLatest(CartTypes.ADD_CART_REQUEST, addCart),

    // some sagas receive extra parameters in addition to an action
    takeLatest(SignUpTypes.SIGN_UP_REQUEST, postSignUp, api),
    takeLatest(SendOtpTypes.SEND_OTP_REQUEST, postSendOtp, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, postLogin, api),
    takeLatest(AuthTypes.AUTH_REQUEST, postAuth, api),
    takeLatest(GetHomepageTypes.GET_HOMEPAGE_REQUEST, postGetHomepage, api),
    takeLatest(GetProductTypes.GET_PRODUCT_REQUEST, postGetProduct, api),
    takeLatest(GetProductTypes.GET_PRODUCT_VARIATION_REQUEST, postGetProductVariation, api),
    takeLatest(AddressTypes.GET_ADDRESS_REQUEST, postGetAddress, api),
  ])
}
