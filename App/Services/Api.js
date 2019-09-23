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
  const monitor = (response) => {
    const { config: { method, url }, data, status } = response;
    console.group(`Requesting [${method.toUpperCase()}] ${url}:`);
    console.log('Response Status:', status);
    console.log('Response Data:', data);
    console.groupEnd();
  };
  api.addMonitor(monitor);
  api.addRequestTransform((request) => {
    if (R.contains(request.method, ['post'])) {
      request.data = qs.stringify(request.data);
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    console.info(request)
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
  const postGetCategory = params =>
    api.post('app-get-categories', params.data_request)


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
    postGetProductVariation,
    postGetAddress,
    postAddAddress,
    postEditAddress,
    postDeleteAddress,
    postGetProvince,
    postGetCity,
    postGetDistrict,
    postGetShippingOptions,
    postGetCategory,
  }
}

// let's return back our create method as the default.
export default {
  create
}
