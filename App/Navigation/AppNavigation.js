import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import SignupScreen from '../Containers/SignupScreen'
import LoginScreen from '../Containers/LoginScreen'
import AuthScreen from '../Containers/AuthScreen'
import HomeScreen from '../Containers/HomeScreen'
import ProductScreen from '../Containers/ProductScreen'
import LearnScreen from '../Containers/LearnScreen'
import CategoryScreen from '../Containers/CategoryScreen'
import OrderScreen from '../Containers/OrderScreen'
import AccountScreen from '../Containers/AccountScreen'
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
import { Images, Colors } from '../Themes'

import styles from './Styles/NavigationStyles'

const MainNav = createBottomTabNavigator({
  Home: { screen: HomeScreen},
  Learn: { screen: LearnScreen},
  Category: { screen: CategoryScreen},
  Order: { screen: OrderScreen},
  Akun: { screen: AccountScreen},
}, {
  // Default config for all screens
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: Colors.mooimom,
    labelStyle: {
      fontSize: 12,
    },
  }
})
// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SignupScreen: { screen: SignupScreen },
  LoginScreen: { screen: LoginScreen },
  AuthScreen: { screen: AuthScreen },
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
  MainScreen: {
     screen: MainNav
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
