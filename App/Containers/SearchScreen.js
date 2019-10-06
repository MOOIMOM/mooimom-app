import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, FlatList, Alert, AppState, Clipboard, ActivityIndicator } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import ProductCardSingle from '../Components/ProductCardSingle'
import GetSearchActions from '../Redux/GetSearchRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import SharedProductActions from '../Redux/SharedProductRedux'
import { connect } from 'react-redux'
import {convertToRupiah, shareDescripton} from '../Lib/utils'

// Styles
import styles from './Styles/SearchScreenStyles'

var isReloadPage = false
class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      search:'',
      products:[],
      willShareDescription:false,
      finishShareImage: false,
      willShareDescriptionString:'',
      currentPage: 1
    }
    this.shareWhatsapp = this.shareWhatsapp.bind(this)
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps(newProps){
    if(this.props.getSearch !== newProps.getSearch){
      if (
        newProps.getSearch.payload !== null &&
        newProps.getSearch.error === null &&
        !newProps.getSearch.fetching && !isReloadPage
      ) {
        this.setState({
          products: newProps.getSearch.payload.products,
        })
      } else if(
        newProps.getSearch.payload !== null &&
        newProps.getSearch.error === null &&
        !newProps.getSearch.fetching && isReloadPage
      ){
        var arr = [...this.state.products]
        arr = arr.concat(newProps.getSearch.payload.products)
        this.setState({
          currentPage: this.state.currentPage + 1,
          products: arr
        })
        isReloadPage = false
      }
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if(this.state.willShareDescription === true){
        this.setState({
          finishShareImage: true
        })
        setTimeout(() => {
          shareDescripton(this.state.willShareDescriptionString, 'whatsapp')
          this.setState({
            willShareDescription: false,
          })
        }, 1000);
      }
    }
    this.setState({appState: nextAppState});
  };

  shareWhatsapp(desc){
    if(this.state.willShareDescription === false){
      this.setState({
        willShareDescriptionString: desc,
        willShareDescription: true,
        finishShareImage : false
      });
    } else {
      Clipboard.setString(desc);
    }
  }

  processSearch(){
    if(this.state.search.length >= 3){
      this.setState({
        products: []
      })
      let data ={
        data_request:{
          user_id: this.props.auth.payload.user_id,
          unique_token: this.props.auth.payload.unique_token,
          what_user_search: this.state.search
        }
      }
      this.props.getSearchProcess(data)
    }
  }

  onEndReached(){
    if (!isReloadPage) {
      if (this.state.currentPage + 1 <= this.props.getSearch.payload.how_many_pages) {
        isReloadPage = true
        let data = {
          data_request:{
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
            what_user_search: this.state.search,
            current_page: this.state.currentPage + 1
          }
        }
        this.props.getSearchProcess(data)
      }
    }
  }

  _renderProduct ({item, index}) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.actNavigate('ProductScreen', {
          product_slug: item.slug,
          auth: this.props.auth
        })}
      >
        <View>
          <ProductCardSingle
            product={item}
            sharedProductProcess={this.props.sharedProductProcess}
            addWishlistProductProcess={this.props.addWishlistProductProcess}
            deleteWishlistProductProcess={this.props.deleteWishlistProductProcess}
            shareWhatsapp={this.shareWhatsapp}
            auth={this.props.auth}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.btnHeader} onPress={
              () => this.props.navigation.goBack()
            }>
              <Image source={Images.back} style={styles.imgHeader}/>
            </TouchableOpacity>
            <View style={styles.searchButton}>
              <TextInput
                style={styles.textSearch}
                onSubmitEditing={() => this.processSearch()}
                onChangeText={val => this.setState({ search: val })}
                autoFocus={true}
                autoCapitalize={'none'}
              />
            </View>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
              {this.props.cart.data.length > 0 && <View style={styles.notifContainer}>
                <Text style={styles.textNotif}>{this.props.cart.data.length}</Text>
              </View>}
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            {this.props.getSearch.fetching && !isReloadPage && <View style={styles.containerLoading}>
              <ActivityIndicator size="large" color={Colors.mooimom} />
            </View>}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.products}
                renderItem={this._renderProduct.bind(this)}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.onEndReached.bind(this)}
                onEndReachedThreshold={5}
              />
          </View>
        </View>
        {this.state.willShareDescription && <View style={styles.modalShareView}>
          <View style={styles.modalShareContainer}>
            <Text style={styles.modalShareText}>Images Downloaded</Text>
            <Text style={(this.state.finishShareImage ? styles.modalShareText : styles.modalShareText2)}>Description Copied</Text>
          </View>
        </View>}
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => {
  return {
    getSearch: state.getSearch,
    auth: state.auth,
    cart: state.cart
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getSearchProcess: data => {
      dispatch(GetSearchActions.getSearchRequest(data))
    },
    addWishlistProductProcess: data => {
      dispatch(EditWishlistActions.addWishlistRequest(data))
    },
    deleteWishlistProductProcess: data => {
      dispatch(EditWishlistActions.deleteWishlistRequest(data))
    },
    sharedProductProcess: data => {
      dispatch(SharedProductActions.sharedProductRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen)
