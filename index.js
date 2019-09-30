import './App/Config/ReactotronConfig'
import { AppRegistry, Text, TextInput } from 'react-native'
import App from './App/Containers/App'
import {onRemoteMessage} from './App/Lib/utils';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent('mooimom', () => App)
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => onRemoteMessage);
