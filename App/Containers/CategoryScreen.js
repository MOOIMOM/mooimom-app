import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, SectionList, BackHandler, ActivityIndicator, AppState, Clipboard } from 'react-native'
import { Images, Metrics,Colors } from '../Themes'
import ProductCardSingle from '../Components/ProductCardSingle'
import CategoryActions from '../Redux/CategoryRedux'
import SharedProductActions from '../Redux/SharedProductRedux'
import EditWishlistActions from '../Redux/EditWishlistRedux'
import GetProductCategoryActions from '../Redux/GetProductCategoryRedux'
import { connect } from 'react-redux'
import {shareDescripton} from '../Lib/utils'

// Styles
import styles from './Styles/CategoryScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

class CategoryScreen extends Component {
  static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = (focused ? Images.category2 : Images.category)
          return <Image source={iconName} style={menuStyles.menuImage}/>
      },
  };
  constructor (props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      categories: [],
      selectedCategoriesId: '',
      selectedCategoriesIdx: 0,
      selectedSubCategoriesId: 0,
      selectedSubCategoriesIdx: 0,
      isSelectSubCategory: false,
      arrTopCategory:[],
      willShareDescription:false,
      finishShareImage: false,
      products: []
    }
    this._renderCategories = this._renderCategories.bind(this)
    this._renderSubCategories = this._renderSubCategories.bind(this)
    this._renderCategoryView = this._renderCategoryView.bind(this)
    this._renderSubCategoryView = this._renderSubCategoryView.bind(this)
    this._renderTopCategories = this._renderTopCategories.bind(this)
    this._renderProduct = this._renderProduct.bind(this)
    this._onLayout = this._onLayout.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    this.shareWhatsapp = this.shareWhatsapp.bind(this)
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        willShareDescriptionString: ''
      }
    }
    this.props.getCategoryRequest(data)
  }

  componentWillReceiveProps(newProps){
    if(newProps.navigation.state.params && newProps.navigation.state.params.category_id !== this.state.selectedCategoriesId){
      const idx = this.getCategoryIndex(newProps.navigation.state.params.category_id)
      this.setState({
        selectedCategoriesId: newProps.navigation.state.params.category_id,
        selectedCategoriesIdx: idx,
        isSelectSubCategory: false
      })
    }

    if(newProps.category !== this.props.category){
      if (
        newProps.category.payload !== null &&
        newProps.category.error === null &&
        !newProps.category.fetching
      ) {
        this.fillCategories(newProps.category.payload.categories)
      }
    }

    if(newProps.productCategory !== this.props.productCategory){
      if (
        newProps.productCategory.payload !== null &&
        newProps.productCategory.error === null &&
        !newProps.productCategory.fetching
      ) {
        this.setState({
          products: newProps.productCategory.payload.products
        })
      }
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
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
        willShareDescription: true,
        finishShareImage : false,
        willShareDescriptionString: desc
      });
    } else {
      Clipboard.setString(desc);
    }
  }

  getCategoryIndex(id){
    var idx = this.state.categories.indexOf(this.state.categories.find(category => category.slug === id))
    return idx
  }

  fillCategories(arr){
    var categories = []
    var firstCategorySlug = ''
    for(var i=0;i<arr.length;i++){
      var subcategories = []
      var l = -1
      for(var j=0;j<arr[i].subcategories.length;j++){
        if(arr[i].subcategories[j].text_only === true){ //CREATE TITLE
          title = arr[i].subcategories[j].name
          subcategories.push({title: title, data: []})
          l++
        } else if(l > -1){ //THIS MAY CAUSE BUG!!!
          subcategories[l].data.push({
            name: arr[i].subcategories[j].name,
            slug: arr[i].subcategories[j].slug,
            img_url: arr[i].subcategories[j].img_url,
          })
        }
      }
      var category = {
          img_url: arr[i].img_url,
          name: arr[i].name,
          slug: arr[i].slug,
          subcategories: subcategories
      }
      if(firstCategorySlug === ''){
        firstCategorySlug = category.slug
      }
      categories.push(category)
    }
    this.setState({
      categories: categories,
      selectedCategoriesIdx: 0,
      selectedCategoriesId: firstCategorySlug
    })
  }

  navigate_to(page, obj = {}) {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  handleBackButtonClick() {
    if(this.state.isSelectSubCategory){
      this.setState({
        isSelectSubCategory: false
      })
      return true;
    }
  }

  pressSubCategory(slug, index){
    this.setState({
      selectedSubCategoriesId: slug,
      selectedSubCategoriesIdx: index,
      products: []
    })
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
        category_slug: slug
      }
    }
    this.props.getProductCategoryRequest(data)
  }

  moveToSubCategories(id){
    var idx = this.state.selectedCategoriesIdx
    var arrTopCategory = []
    this.state.categories[idx].subcategories.map((category) => {
      category.data.map((data) => {
        var obj = {}
        obj.name = data.name
        obj.slug = data.slug
        arrTopCategory.push(obj)
      })
    })
    var index = arrTopCategory.findIndex(item => item.slug === id)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.setState({
      isSelectSubCategory: true,
      arrTopCategory:arrTopCategory,
      selectedSubCategoriesId: id,
      selectedSubCategoriesIdx: index
    })
    this.pressSubCategory(id, index)
  }

  _renderCategories(){
    if(this.state.categories.length > 0)
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
      {this.state.categories.map((item, index) => {
        let style = styles.categoryView
        if(this.state.selectedCategoriesIdx === index){
          style = styles.categoryView2
        }
        return (
          <TouchableOpacity
          onPress={() => this.setState({
            selectedCategoriesId: item.slug,
            selectedCategoriesIdx: index
          })}
          key={index.toString()}
          >
            <View style={style}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      </ScrollView>
    )
  }

  _renderTopCategories({item, index}){
    let styleBtn = styles.btnTopCategories
    let styleText = styles.textBtnTopCategories
    if(this.state.selectedSubCategoriesId === item.slug){
      styleBtn = styles.btnTopCategoriesSelected
      styleText = styles.textBtnTopCategoriesSelected
    }
    return (
      <TouchableOpacity style={styleBtn}
      onPress={() => this.pressSubCategory(item.slug, index)}
      >
        <Text style={styleText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  _renderSubCategories({ section, index}){
    if (index % 3 !== 0) return null;
    const { navigate } = this.props.navigation
    const items = [];

    for (let i = index; i < index + 3; i++) {
      if (i >= section.data.length) {
        break;
      }
      var image = Images.default
      if(section.data[i].img_url && section.data[i].img_url !== '')
        image = {uri:section.data[i].img_url}
      items.push(
        <TouchableWithoutFeedback key={section.data[i].slug} onPress={() => {
          this.moveToSubCategories(section.data[i].slug)
        }}>
          <View style={styles.productContainer}>
            <Image source={image} style={styles.productImage}/>
            <Text style={styles.productText}>{section.data[i].name}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <View style={styles.productRow}>
        {items}
      </View>
    );
  }

  _renderSectionHeader({section: {title}}) {
    return (
      <Text style={styles.subCategoryHeaderText}>{title}</Text>
    )
  }

  _renderProduct ({item, index}) {
    const { navigate } = this.props.navigation
    return (
      <TouchableWithoutFeedback
        onPress={() => this.navigate_to('ProductScreen', {
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

  _renderCategoryView(){
    return (
      <View style={styles.containerScroll}>
        <View style={styles.backgroundHeader} />
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.searchButton} onPress={() => this.navigate_to('SearchScreen')}>
            <Image source={Images.search} style={styles.imageSearch}/>
            <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHeader} onPress={() => this.navigate_to('CartScreen')}>
            <Image source={Images.shoppingCart} style={styles.imgHeader}/>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperSeparator}/>
        <View style={styles.contentContainer}>
          <View style={styles.leftContainer}>
            {this._renderCategories()}
          </View>
          <View style={styles.rightContainer}>
            <SectionList
              renderItem={this._renderSubCategories}
              renderSectionHeader={this._renderSectionHeader}
              sections={this.state.categories[this.state.selectedCategoriesIdx].subcategories}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    )
  }

  _onLayout(){
    this.list.scrollToIndex({index: this.state.selectedSubCategoriesIdx})
  }

  _renderSubCategoryView(){
    return (
      <View style={styles.containerScroll}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.btnHeader} onPress={
            () => this.setState({isSelectSubCategory: false})
          }>
            <Image source={Images.back} style={styles.imgHeader}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton} onPress={() => this.navigate_to('SearchScreen')}>
            <Image source={Images.search} style={styles.imageSearch}/>
            <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHeader} onPress={() => this.navigate_to('CartScreen')}>
            <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperSeparator}/>
        <View style={styles.contentContainer2}>
          <View style={styles.topContainer} onLayout={() => this._onLayout()}>
            <FlatList
              ref={el => this.list = el}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.arrTopCategory}
              renderItem={this._renderTopCategories}
              keyExtractor={(item, index) => index.toString()}
              getItemLayout={(data, index) => (
                {length: Metrics.screenWidth / 4, offset: (Metrics.screenWidth / 4) * index, index}
              )}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.subtitleCategory}>{this.state.arrTopCategory[this.state.selectedSubCategoriesIdx].name}</Text>
            {this.props.productCategory.fetching && <View style={styles.containerLoading2}>
              <ActivityIndicator size="large" color={Colors.mooimom} />
            </View>}
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.products}
              renderItem={this._renderProduct}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        {this.state.willShareDescription && <View style={styles.modalShareView}>
          <View style={styles.modalShareContainer}>
            <Text style={styles.modalShareText}>Images Downloaded</Text>
            <Text style={(this.state.finishShareImage ? styles.modalShareText : styles.modalShareText2)}>Product Name Copied</Text>
          </View>
        </View>}
      </View>
    )
  }

  render () {
    if(this.state.categories.length < 1)
      return(
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color={Colors.mooimom} />
        </View>
      )
    return (
      <View style={styles.container}>
        {!this.state.isSelectSubCategory && this._renderCategoryView()}
        {this.state.isSelectSubCategory && this._renderSubCategoryView()}
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    category: state.category,
    productCategory: state.productCategory
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCategoryRequest: data => {
      dispatch(CategoryActions.getCategoryRequest(data))
    },
    getProductCategoryRequest: data => {
      dispatch(GetProductCategoryActions.getProductCategoryRequest(data))
    },
    sharedProductProcess: data => {
      dispatch(SharedProductActions.sharedProductRequest(data))
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
)(CategoryScreen)
