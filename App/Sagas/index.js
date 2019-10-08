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
import { GetProductCategoryTypes } from '../Redux/GetProductCategoryRedux'
import { CartTypes } from '../Redux/CartRedux'
import { GetAddressTypes } from '../Redux/GetAddressRedux'
import { EditAddressTypes } from '../Redux/EditAddressRedux'
import { ProvinceTypes } from '../Redux/ProvinceRedux'
import { CityTypes } from '../Redux/CityRedux'
import { DistrictTypes } from '../Redux/DistrictRedux'
import { GetShippingOptionsTypes } from '../Redux/GetShippingOptionsRedux'
import { CategoryTypes } from '../Redux/CategoryRedux'
import { WishlistTypes } from '../Redux/WishlistRedux'
import { EditWishlistTypes } from '../Redux/EditWishlistRedux'
import { SettingTypes } from '../Redux/SettingRedux'
import { ProfileTypes } from '../Redux/ProfileRedux'
import { EditProfileTypes } from '../Redux/EditProfileRedux'
import { BalanceTypes } from '../Redux/BalanceRedux'
import { BankAccountTypes } from '../Redux/BankAccountRedux'
import { EditBankAccountTypes } from '../Redux/EditBankAccountRedux'
import { WithdrawTypes } from '../Redux/WithdrawRedux'
import { AddWithdrawTypes } from '../Redux/AddWithdrawRedux'
import { GetSearchTypes } from '../Redux/GetSearchRedux'
import { GetNotificationTypes } from '../Redux/GetNotificationRedux'
import { GetAllOrderTypes } from '../Redux/GetAllOrderRedux'
import { GetOrderTypes } from '../Redux/GetOrderRedux'
import { GetCommissionSummaryTypes } from '../Redux/GetCommissionSummaryRedux'
import { CheckoutTypes } from '../Redux/CheckoutRedux'
import { CommissionEstimationTypes } from '../Redux/CommissionEstimationRedux'
import { LastNotificationTimeTypes } from '../Redux/LastNotificationTimeRedux'
import { GetOrderStatusMidtransTypes } from '../Redux/GetOrderStatusMidtransRedux'
import { GetVideoTypes } from '../Redux/GetVideoRedux'
import { GetArticleTypes } from '../Redux/GetArticleRedux'
import { GetQuestionTypes } from '../Redux/GetQuestionRedux'
import { SubscribeProductTypes } from '../Redux/SubscribeProductRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { saveSharedProduct } from './SharedProductSagas'
import { postSignUp } from './SignUpSagas'
import { postSendOtp } from './SendOtpSagas'
import { postLogin } from './LoginSagas'
import { postAuth } from './AuthSagas'
import { postGetHomepage } from './GetHomepageSagas'
import { postGetProduct } from './GetProductSagas'
import { postGetProductByCategory } from './GetProductCategorySagas'
import { postGetProductVariation } from './GetProductVariationSagas'
import { addCart } from './AddCartSagas'
import { postGetAddress } from './GetAddressSagas'
import { postAddAddress } from './AddAddressSagas'
import { postEditAddress } from './EditAddressSagas'
import { postDeleteAddress } from './DeleteAddressSagas'
import { postGetProvince } from './GetProvinceSagas'
import { postGetCity } from './GetCitySagas'
import { postGetDistrict } from './GetDistrictSagas'
import { postGetShippingOptions } from './GetShippingOptionsSagas'
import { postGetCategory } from './GetCategorySagas'
import { postAddWishlist } from './AddWishlistSagas'
import { postDeleteWishlist } from './DeleteWishlistSagas'
import { postGetWishlist } from './GetWishlistSagas'
import { postGetSetting } from './GetSettingSagas'
import { postGetProfile } from './GetProfileSagas'
import { postEditProfile } from './EditProfileSagas'
import { postUpdateProfilePicture } from './EditProfilePictureSagas'
import { postGetBalance } from './GetBalanceSagas'
import { postGetBankAccounts } from './GetBankAccountSagas'
import { postAddBankAccount } from './AddBankAccountSagas'
import { postEditBankAccount } from './EditBankAccountSagas'
import { postDeleteBankAccount } from './DeleteBankAccountSagas'
import { postGetWithdraw } from './WithdrawSagas'
import { postAddWithdraw } from './AddWithdrawSagas'
import { postGetSearch } from './GetSearchSagas'
import { postGetNotification } from './GetNotificationSagas'
import { postGetAllOrders } from './GetAllOrderSagas'
import { postGetOrder } from './GetOrderSagas'
import { postGetCommissionSummary } from './GetCommissionSummarySagas'
import { postCheckout } from './CheckoutSagas'
import { postGetCommissionEstimation } from './GetCommissionEstimationSagas'
import { saveLastNotificationTime } from './SaveLastNotificationTimeSagas'
import { postGetOrderStatusMidtrans } from './GetOrderStatusMidtransSagas'
import { postGetVideo } from './GetVideoSagas'
import { postGetArticle } from './GetArticleSagas'
import { postGetQuestion } from './GetQuestionSagas'
import { postSubscribeProduct } from './SubscribeProductSagas'

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
    takeLatest(LastNotificationTimeTypes.LAST_NOTIFICATION_TIME_REQUEST, saveLastNotificationTime),

    // some sagas receive extra parameters in addition to an action
    takeLatest(SignUpTypes.SIGN_UP_REQUEST, postSignUp, api),
    takeLatest(SendOtpTypes.SEND_OTP_REQUEST, postSendOtp, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, postLogin, api),
    takeLatest(AuthTypes.AUTH_REQUEST, postAuth, api),
    takeLatest(GetHomepageTypes.GET_HOMEPAGE_REQUEST, postGetHomepage, api),
    takeLatest(GetProductTypes.GET_PRODUCT_REQUEST, postGetProduct, api),
    takeLatest(GetProductCategoryTypes.GET_PRODUCT_CATEGORY_REQUEST, postGetProductByCategory, api),
    takeLatest(GetProductTypes.GET_PRODUCT_VARIATION_REQUEST, postGetProductVariation, api),
    takeLatest(GetAddressTypes.GET_ADDRESS_REQUEST, postGetAddress, api),
    takeLatest(EditAddressTypes.ADD_ADDRESS_REQUEST, postAddAddress, api),
    takeLatest(EditAddressTypes.EDIT_ADDRESS_REQUEST, postEditAddress, api),
    takeLatest(EditAddressTypes.DELETE_ADDRESS_REQUEST, postDeleteAddress, api),
    takeLatest(ProvinceTypes.GET_PROVINCE_REQUEST, postGetProvince, api),
    takeLatest(CityTypes.GET_CITY_REQUEST, postGetCity, api),
    takeLatest(DistrictTypes.GET_DISTRICT_REQUEST, postGetDistrict, api),
    takeLatest(GetShippingOptionsTypes.GET_SHIPPING_OPTIONS_REQUEST, postGetShippingOptions, api),
    takeLatest(CategoryTypes.GET_CATEGORY_REQUEST, postGetCategory, api),
    takeLatest(EditWishlistTypes.ADD_WISHLIST_REQUEST, postAddWishlist, api),
    takeLatest(EditWishlistTypes.DELETE_WISHLIST_REQUEST, postDeleteWishlist, api),
    takeLatest(WishlistTypes.GET_WISHLIST_REQUEST, postGetWishlist, api),
    takeLatest(SettingTypes.GET_SETTING_REQUEST, postGetSetting, api),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, postGetProfile, api),
    takeLatest(EditProfileTypes.EDIT_PROFILE_REQUEST, postEditProfile, api),
    takeLatest(EditProfileTypes.EDIT_PROFILE_PICTURE_REQUEST, postUpdateProfilePicture, api),
    takeLatest(BalanceTypes.GET_BALANCE_REQUEST, postGetBalance, api),
    takeLatest(BankAccountTypes.GET_BANK_ACCOUNT_REQUEST, postGetBankAccounts, api),
    takeLatest(EditBankAccountTypes.ADD_BANK_ACCOUNT_REQUEST, postAddBankAccount, api),
    takeLatest(EditBankAccountTypes.EDIT_BANK_ACCOUNT_REQUEST, postEditBankAccount, api),
    takeLatest(EditBankAccountTypes.DELETE_BANK_ACCOUNT_REQUEST, postDeleteBankAccount, api),
    takeLatest(WithdrawTypes.GET_WITHDRAW_REQUEST, postGetWithdraw, api),
    takeLatest(AddWithdrawTypes.ADD_WITHDRAW_REQUEST, postAddWithdraw, api),
    takeLatest(GetSearchTypes.GET_SEARCH_REQUEST, postGetSearch, api),
    takeLatest(GetNotificationTypes.GET_NOTIFICATION_REQUEST, postGetNotification, api),
    takeLatest(GetAllOrderTypes.GET_ALL_ORDER_REQUEST, postGetAllOrders, api),
    takeLatest(GetOrderTypes.GET_ORDER_REQUEST, postGetOrder, api),
    takeLatest(GetCommissionSummaryTypes.GET_COMMISSION_SUMMARY_REQUEST, postGetCommissionSummary, api),
    takeLatest(CommissionEstimationTypes.GET_COMMISSION_ESTIMATION_REQUEST, postGetCommissionEstimation, api),
    takeLatest(CheckoutTypes.GET_CHECKOUT_REQUEST, postCheckout, api),
    takeLatest(GetOrderStatusMidtransTypes.GET_ORDER_STATUS_MIDTRANS_REQUEST, postGetOrderStatusMidtrans, api),
    takeLatest(GetVideoTypes.GET_VIDEO_REQUEST, postGetVideo, api),
    takeLatest(GetArticleTypes.GET_ARTICLE_REQUEST, postGetArticle, api),
    takeLatest(GetQuestionTypes.GET_QUESTION_REQUEST, postGetQuestion, api),
    takeLatest(SubscribeProductTypes.SUBSCRIBE_PRODUCT_REQUEST, postSubscribeProduct, api),
  ])
}
