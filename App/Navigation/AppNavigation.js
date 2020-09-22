import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import HowtoScreen from '../Containers/HowtoScreen'
import SignupScreen from '../Containers/SignupScreen'
import AuthScreen from '../Containers/AuthScreen'
import HomeScreen from '../Containers/HomeScreen'
import ProductScreen from '../Containers/ProductScreen'
import LearnScreen from '../Containers/LearnScreen'
import CategoryScreen from '../Containers/CategoryScreen'
import OrderScreen from '../Containers/OrderScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import CartScreen from '../Containers/CartScreen'
import DeliveryScreen from '../Containers/DeliveryScreen'
import AddressListScreen from '../Containers/AddressListScreen'
import NewAddressScreen from '../Containers/NewAddressScreen'
import UpdateAddressScreen from '../Containers/UpdateAddressScreen'
import EditProfileScreen from '../Containers/EditProfileScreen'
import SearchScreen from '../Containers/SearchScreen'
import SharedProductScreen from '../Containers/SharedProductScreen'
import DetailTargetScreen from '../Containers/DetailTargetScreen'
import DetailOrderScreen from '../Containers/DetailOrderScreen'
import ContactScreen from '../Containers/ContactScreen'
import NotificationScreen from '../Containers/NotificationScreen'
import AccountListScreen from '../Containers/AccountListScreen'
import NewAccountScreen from '../Containers/NewAccountScreen'
import UpdateAccountScreen from '../Containers/UpdateAccountScreen'
import PaymentScreen from '../Containers/PaymentScreen'
import NewPaymentRequestScreen from '../Containers/NewPaymentRequestScreen'
import VoucherScreen from '../Containers/VoucherScreen'
import VoucherDetailScreen from '../Containers/VoucherDetailScreen'
import EventRegistrationScreen from '../Containers/EventRegistrationScreen'
import PointsHistoryScreen from '../Containers/PointsHistoryScreen'
import ProfileCompletionScreen from '../Containers/ProfileCompletionScreen'
import OpenMapScreen from '../Containers/OpenMapScreen'
import BeOurMerchantScreen from '../Containers/BeOurMerchantScreen'
import NewCategoryScreen from '../Containers/NewCategoryScreen'
import NewCategoryProductScreen from '../Containers/NewCategoryProductScreen'
import NewProductScreen from '../Containers/NewProductScreen'
import NewProfileScreen from '../Containers/NewProfileScreen'
import NewEditProfileScreen from '../Containers/NewEditProfileScreen'
import NewPurchaseScreen from '../Containers/NewPurchaseScreen'
import NewDetailOrderScreen from '../Containers/NewDetailOrderScreen'
import NewTrackOrderScreen from '../Containers/NewTrackOrderScreen'
import NewWishlistScreen from '../Containers/NewWishlistScreen'
import NewReferralScreen from '../Containers/NewReferralScreen'
import NewVoucherListScreen from '../Containers/NewVoucherListScreen'
import NewAddressListScreen from '../Containers/NewAddressListScreen'
import NewChangePasswordScreen from '../Containers/NewChangePasswordScreen'
import NewBankAccountList from '../Containers/NewBankAccountList'
import NewReturnExchangeScreen from '../Containers/NewReturnExchangeScreen'
import NewContactUsScreen from '../Containers/NewContactUsScreen'
import NewMooimomPointsScreen from '../Containers/NewMooimomPointsScreen'
import NewChangePhoneNumberScreen from '../Containers/NewChangePhoneNumberScreen'
import NewCheckoutScreen from '../Containers/NewCheckoutScreen'

import { Images, Colors, Fonts, Metrics } from '../Themes'

import styles from './Styles/NavigationStyles'

const MainNav = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Mamapedia: { screen: LearnScreen },
  // Category: { screen: CategoryScreen },
  Inbox: { screen: NotificationScreen },
  Order: { screen: OrderScreen },
  // Profile: { screen: ProfileScreen },
  Profile: { screen: NewProfileScreen }
}, {
  // Default config for all screens
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: Colors.mooimom,
    labelStyle: {
      fontSize: Metrics.fontSize1,
      fontFamily: Fonts.type.gotham2,
    },
  }
})

const AuthStack = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  HowtoScreen: { screen: HowtoScreen },
  SignupScreen: { screen: SignupScreen },
  AuthScreen: { screen: AuthScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

// Manifest of possible screens
const AppStack = createStackNavigator({
  MainScreen: {
    screen: MainNav
  },
  NewCheckoutScreen: { screen: NewCheckoutScreen },
  NewChangePhoneNumberScreen: { screen: NewChangePhoneNumberScreen },
  NewMooimomPointsScreen: { screen: NewMooimomPointsScreen },
  NewContactUsScreen: { screen: NewContactUsScreen },
  NewReturnExchangeScreen: { screen: NewReturnExchangeScreen },
  NewBankAccountList: { screen: NewBankAccountList },
  NewChangePasswordScreen: { screen: NewChangePasswordScreen },
  NewAddressListScreen: { screen: NewAddressListScreen },
  NewVoucherListScreen: { screen: NewVoucherListScreen },
  NewReferralScreen: { screen: NewReferralScreen },
  NewWishlistScreen: { screen: NewWishlistScreen },
  NewTrackOrderScreen: { screen: NewTrackOrderScreen },
  NewDetailOrderScreen: { screen: NewDetailOrderScreen },
  NewPurchaseScreen: { screen: NewPurchaseScreen },
  NewEditProfileScreen: { screen: NewEditProfileScreen },
  NewCategoryProductScreen: { screen: NewCategoryProductScreen },
  NewCategoryScreen: { screen: NewCategoryScreen },
  NewProductScreen: { screen: NewProductScreen },
  ProductScreen: { screen: ProductScreen },
  CartScreen: { screen: CartScreen },
  DeliveryScreen: { screen: DeliveryScreen },
  AddressListScreen: { screen: AddressListScreen },
  NewAddressScreen: { screen: NewAddressScreen },
  UpdateAddressScreen: { screen: UpdateAddressScreen },
  EditProfileScreen: { screen: EditProfileScreen },
  SearchScreen: { screen: SearchScreen },
  SharedProductScreen: { screen: SharedProductScreen },
  DetailTargetScreen: { screen: DetailTargetScreen },
  DetailOrderScreen: { screen: DetailOrderScreen },
  ContactScreen: { screen: ContactScreen },
  // NotificationScreen: { screen: NotificationScreen },
  AccountListScreen: { screen: AccountListScreen },
  NewAccountScreen: { screen: NewAccountScreen },
  UpdateAccountScreen: { screen: UpdateAccountScreen },
  PaymentScreen: { screen: PaymentScreen },
  NewPaymentRequestScreen: { screen: NewPaymentRequestScreen },
  VoucherScreen: { screen: VoucherScreen },
  VoucherDetailScreen: { screen: VoucherDetailScreen },
  EventRegistrationScreen: { screen: EventRegistrationScreen },
  PointsHistoryScreen: { screen: PointsHistoryScreen },
  ProfileCompletionScreen: { screen: ProfileCompletionScreen },
  OpenMapScreen: { screen: OpenMapScreen },
  BeOurMerchantScreen: { screen: BeOurMerchantScreen }

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MainScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: SplashScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
