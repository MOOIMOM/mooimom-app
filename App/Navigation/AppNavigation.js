import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import SignupScreen from '../Containers/SignupScreen'
import LoginScreen from '../Containers/LoginScreen'
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
import { Images, Colors, Fonts } from '../Themes'

import styles from './Styles/NavigationStyles'

const MainNav = createBottomTabNavigator({
  Home: { screen: HomeScreen},
  Learn: { screen: LearnScreen},
  Category: { screen: CategoryScreen},
  Order: { screen: OrderScreen},
  Akun: { screen: ProfileScreen},
}, {
  // Default config for all screens
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: Colors.mooimom,
    labelStyle: {
      fontSize: 12,
      fontFamily: Fonts.type.gotham2,
    },
    style: {
      paddingVertical:4
    },
  }
})

const AuthStack = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SignupScreen: { screen: SignupScreen },
  LoginScreen: { screen: LoginScreen },
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
  NotificationScreen: { screen: NotificationScreen },
  AccountListScreen: { screen: AccountListScreen },
  NewAccountScreen: { screen: NewAccountScreen },
  UpdateAccountScreen: { screen: UpdateAccountScreen },
  PaymentScreen: { screen: PaymentScreen },
  NewPaymentRequestScreen: { screen: NewPaymentRequestScreen },
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
