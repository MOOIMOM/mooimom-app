import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'

import RNAiqua from 'react-native-aiqua-sdk'
import codePush from 'react-native-code-push'
import { NetworkProvider } from '../Components/NetworkProvider'
// import LowConnectionAlert from '../Components/LowConnectionAlert'

// create our store
const store = createStore()

RNAiqua.configure({
  appId: '886fd65fc66d1db30244',
  isDev: false,
  senderId: '436426610167',
  appGroup: 'group.com.mooimom.id.ios.notification'// ios dev or prod - default `false` - optional
})

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NetworkProvider>
          {/* <LowConnectionAlert /> */}
          <RootContainer />
        </NetworkProvider>
      </Provider>
    )
  }
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
}

App = codePush(codePushOptions)(App)
// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
