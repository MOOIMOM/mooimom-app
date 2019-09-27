import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import { persistReducer } from 'redux-persist'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  sharedProduct: require('./SharedProductRedux').reducer,
  register: require('./SignUpRedux').reducer,
  login: require('./LoginRedux').reducer,
  sendOtp: require('./SendOtpRedux').reducer,
  auth: require('./AuthRedux').reducer,
  getHomepage: require('./GetHomepageRedux').reducer,
  product: require('./GetProductRedux').reducer,
  productCategory: require('./GetProductCategoryRedux').reducer,
  cart: require('./CartRedux').reducer,
  address: require('./GetAddressRedux').reducer,
  editaddress: require('./EditAddressRedux').reducer,
  province: require('./ProvinceRedux').reducer,
  city: require('./CityRedux').reducer,
  district: require('./DistrictRedux').reducer,
  shippingOptions: require('./GetShippingOptionsRedux').reducer,
  category: require('./CategoryRedux').reducer,
  wishlist: require('./WishlistRedux').reducer,
  editWishlist: require('./EditWishlistRedux').reducer,
  setting: require('./SettingRedux').reducer,
  profile: require('./ProfileRedux').reducer,
  editprofile: require('./EditProfileRedux').reducer,
  balance: require('./BalanceRedux').reducer,
  bankAccount: require('./BankAccountRedux').reducer,
  editBankAccount: require('./EditBankAccountRedux').reducer,
  withdraw: require('./WithdrawRedux').reducer,
  addWithdraw: require('./AddWithdrawRedux').reducer,
  getSearch: require('./GetSearchRedux').reducer,
  notification: require('./GetNotificationRedux').reducer,
  allOrder: require('./GetAllOrderRedux').reducer,
  order: require('./GetOrderRedux').reducer,
  commissionSummary: require('./GetCommissionSummaryRedux').reducer,
  checkout: require('./CheckoutRedux').reducer,
  commissionEstimation: require('./CommissionEstimationRedux').reducer,
  lastNotification: require('./LastNotificationTimeRedux').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
};
