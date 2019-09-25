import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Alert, FlatList, AppState, Clipboard, ActivityIndicator } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import ProductCardSingle from '../Components/ProductCardSingle'
import GetSearchActions from '../Redux/GetSearchRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/SearchScreenStyles'
class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search:'',
      products:[],
      willShareDescription:false,
      finishShareImage: false,
    }
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
        !newProps.getSearch.fetching
      ) {
        this.setState({
          products: newProps.getSearch.payload.products,
        })
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
          shareDescripton(this.state.product.description, 'whatsapp')
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

  _renderProduct ({item, index}) {
    const { navigate } = this.props.navigation
    return (
      <TouchableWithoutFeedback
        onPress={() => navigate('ProductScreen', {
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
    );
  }

  render () {
    return (
      <View style={styles.container}>
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
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            {this.props.getSearch.fetching && <View style={styles.containerLoading}>
              <ActivityIndicator size="large" color={Colors.mooimom} />
            </View>}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.products}
                renderItem={this._renderProduct.bind(this)}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
            {this.state.willShareDescription && <View style={styles.modalShareView}>
              <View style={styles.modalShareContainer}>
                <Text style={styles.modalShareText}>Images Downloaded</Text>
                <Text style={(this.state.finishShareImage ? styles.modalShareText : styles.modalShareText2)}>shareWhatsapp Copied</Text>
              </View>
            </View>}
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    getSearch: state.getSearch,
    auth: state.auth
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
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen)
