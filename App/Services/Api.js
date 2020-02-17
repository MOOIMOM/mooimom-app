// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import qs from 'qs';
import R from 'ramda';
// our "constructor"

const create = (baseURL = 'https://www.mooimom.id/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000
  })
  // const monitor = (response) => {
  //   const { config: { method, url }, data, status } = response;
  //   console.group(`Requesting [${method.toUpperCase()}] ${url}:`);
  //   console.log('Response Status:', status);
  //   console.log('Response Data:', data);
  //   console.groupEnd();
  // };
  // api.addMonitor(monitor);
  api.addRequestTransform((request) => {
    if (request.url === 'app-update-profile-picture') {
      request.headers['Content-Type'] = 'multipart/form-data';
    }
    else if (R.contains(request.method, ['post'])) {
      request.data = qs.stringify(request.data);
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    // console.info(request)
  });
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const postSignUp = params =>
    api.post('app-register', params.data_request)
  const postSendOtp = params =>
    api.post('app-send-sms-otp', params.data_request)
  const postLogin = params =>
    api.post('app-login-verification', params.data_request)
  const postAuth = params =>
    api.post('app-user-otp-verification', params.data_request)
  const postGetHomepage = params =>
    api.post('app-homepage', params.data_request)
  const postGetProduct = params =>
    api.post('app-get-product', params.data_request)
  const postGetProductByCategory = params =>
    api.post('app-get-products', params.data_request)
  const postGetProductVariation = params =>
    api.post('app-get-product-variation', params.data_request)
  const postGetAddress = params =>
    api.post('app-get-addresses', params.data_request)
  const postAddAddress = params =>
    api.post('app-add-new-address', params.data_request)
  const postEditAddress = params =>
    api.post('app-update-address', params.data_request)
  const postDeleteAddress = params =>
    api.post('app-delete-address', params.data_request)
  const postGetProvince = params =>
    api.post('app-get-provinces', params.data_request)
  const postGetCity = params =>
    api.post('app-get-cities', params.data_request)
  const postGetDistrict = params =>
    api.post('app-get-districts', params.data_request)
  const postGetShippingOptions = params =>
    api.post('app-get-shipping-options', params.data_request)
  const postGetCommissionEstimation = params =>
    api.post('app-get-possible-commission-for-checkout-page', params.data_request)
  const postCheckout = params =>
    api.post('app-checkout', params.data_request)
  const postGetCategory = params =>
    api.post('app-get-categories', params.data_request)
  const postAddWishlist = params =>
    api.post('app-add-to-wishlist', params.data_request)
  const postDeleteWishlist = params =>
    api.post('app-delete-wishlist', params.data_request)
  const postGetWishlist = params =>
    api.post('app-get-all-wishlist', params.data_request)
  const postGetSearch = params =>
    api.post('app-get-search', params.data_request)
  const postGetProfile = params =>
    api.post('app-get-customer-data-and-profile-picture', params.data_request)
  const postEditProfile = params =>
    api.post('app-update-profile', params.data_request)
  const postUpdateProfilePicture = params =>
    api.post('app-update-profile-picture', params.data_request)
  const postGetSetting = params =>
    api.post('app-get-global-setting', params.data_request)
  const postGetBankAccounts = params =>
    api.post('app-get-bank-accounts', params.data_request)
  const postAddBankAccount = params =>
    api.post('app-add-bank-account', params.data_request)
  const postEditBankAccount = params =>
    api.post('app-update-bank-account', params.data_request)
  const postDeleteBankAccount = params =>
    api.post('app-delete-bank-account', params.data_request)
  const postGetNotification = params =>
    api.post('app-get-notifications', params.data_request)
  const postGetAllOrders = params =>
    api.post('app-get-orders', params.data_request)
  const postGetOrder = params =>
    api.post('app-get-one-order', params.data_request)
  const postGetWithdraw = params =>
    api.post('app-get-customer-commission-withdraw', params.data_request)
  const postAddWithdraw = params =>
    api.post('app-create-customer-commission-withdraw', params.data_request)
  const postGetCommissionSummary = params =>
    api.post('app-get-commission-summary-this-week', params.data_request)
  const postGetCommissionByDate = params =>
    api.post('app-get-commission-summary-from-date-a-to-date-b', params.data_request)
  const postGetBalance = params =>
    api.post('app-current-saldo', params.data_request)
  const postGetOrderStatusMidtrans = params =>
    api.post('app-get-order-status-from-midtrans', params.data_request)
  const postGetMidtransStatus = params =>
    api.post('app-get-order-status-from-midtrans', params.data_request)
  const postGetVideo = params =>
    api.post('app-get-youtube-videos', params.data_request)
  const postGetArticle = params =>
    api.post('app-get-articles', params.data_request)
  const postGetQuestion = params =>
    api.post('app-get-question-and-answer', params.data_request)
  const postSubscribeProduct = params =>
    api.post('app-link-user-with-product-stock-notification', params.data_request)
  const postGetMooimomPoints = params =>
    api.post('app-get-mooimom-app-points', params.data_request)
  const postGetGoSendShipment = params =>
    api.post('wp-json/mooimom/v1/gosend-get-price-data-for-location-a-to-b', params.data_request)
  const postCheckCoupon = params =>
    api.post('app-add-coupon-to-shopping-cart', params.data_request)
  const postGetVouchers = params =>
    api.post('app-get-app-events', params.data_request)
  const postGetOneVoucher = params =>
    api.post('app-get-one-app-event', params.data_request)
  const postEventFormHandler = params =>
    api.post('app-event-form-handler', params.data_request)
  const postDeleteNotif = params =>
    api.post('app-delete-notification', params.data_request)
  const postCancelOrder = params =>
    api.post('app-cancel-order', params.data_request)
  const postGetOnlineCart = params =>
    api.post('app-get-shopping-cart', params.data_request)
  const postGetAppVersion = () =>
    api.post('app-get-app-version')
  const postDeleteOrderHistory = params =>
    api.post('app-delete-order', params.data_request)
  const postUpdateOnlineCart = params =>
    api.post('app-update-shopping-cart', params.data_request)
  const postChooseFreeGift = params =>
    api.post('app-choose-free-gift-shopping-cart', params.data_request)
  const postGetAllEventForm = params =>
    api.post('app-get-event-form-data', params.data_request)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    postSignUp,
    postSendOtp,
    postLogin,
    postAuth,
    postGetHomepage,
    postGetProduct,
    postGetProductByCategory,
    postGetProductVariation,
    postGetAddress,
    postAddAddress,
    postEditAddress,
    postDeleteAddress,
    postGetProvince,
    postGetCity,
    postGetDistrict,
    postGetShippingOptions,
    postGetCommissionEstimation,
    postCheckout,
    postGetCategory,
    postAddWishlist,
    postDeleteWishlist,
    postGetWishlist,
    postGetSearch,
    postGetProfile,
    postEditProfile,
    postUpdateProfilePicture,
    postGetSetting,
    postGetBankAccounts,
    postAddBankAccount,
    postEditBankAccount,
    postDeleteBankAccount,
    postGetNotification,
    postGetAllOrders,
    postGetOrder,
    postGetWithdraw,
    postAddWithdraw,
    postGetCommissionSummary,
    postGetCommissionByDate,
    postGetBalance,
    postGetOrderStatusMidtrans,
    postGetMidtransStatus,
    postGetVideo,
    postGetArticle,
    postGetQuestion,
    postSubscribeProduct,
    postGetMooimomPoints,
    postGetGoSendShipment,
    postCheckCoupon,
    postGetVouchers,
    postGetOneVoucher,
    postEventFormHandler,
    postDeleteNotif,
    postCancelOrder,
    postGetOnlineCart,
    postGetAppVersion,
    postDeleteOrderHistory,
    postUpdateOnlineCart,
    postChooseFreeGift,
    postGetAllEventForm
  }
}

// let's return back our create method as the default.
export default {
  create,
}
