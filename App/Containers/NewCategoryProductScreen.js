import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, FlatList, Modal, TouchableWithoutFeedback } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
import NewProductCard from '../Components/NewProductCard'
import SortOption from '../Components/SortOption'
import SizeFilter from '../Components/SizeFliter'
import ColorFilter from '../Components/ColorFilter'
import PriceRangeFilter from '../Components/PriceRangeFilter'
import { DotIndicator } from 'react-native-indicators'
import axios from 'axios'

export default class NewCategoryProductScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newProducts: [],
      sortOptions: [
        // { name: 'Popular', value: 'popular' },
        { name: 'New Arrival', value: 'new_arrival' },
        { name: 'Best Seller', value: 'best_seller' },
        // { name: 'Selected Product', value: 'selected_product' },
        { name: 'Price Low to High', value: 'price' },
        { name: 'Price High to Low', value: 'reverse_price' },
      ],
      sizeOptions: [],
      colorOptions: [],
      subCategory: [],
      loading: false,
      loadMore: false,
      isSizeFilterSelected: false,
      selectedSize: '',
      isColorFilterSelected: false,
      selectedColor: '',
      sortOptionModal: false,
      filterOptionModal: false,
      selectedSort: '',
      currentPage: 1
    }

    this.navigate_to = this.navigate_to.bind(this)
    this.renderNewProduct = this.renderNewProduct.bind(this)
  }

  componentDidMount() {
    this.getHomepageData(this.state.currentPage)
  }

  navigate_to(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  // isCloseToBottom(nativeEvent) {
  //   const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
  //   const paddingToBottom = Metrics.screenHeight;
  //   return layoutMeasurement.height + contentOffset.y >=
  //     contentSize.height - paddingToBottom;
  // }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return layoutMeasurement.height + contentOffset.y
      >= contentSize.height - 50;
  }

  loadMoreData() {
    let currentPage = this.state.currentPage + 1
    // if (this.props.navigation.state.params.category_id) {
    //   let category_id = this.props.navigation.state.params.category_id
    //   let rawIndex = [currentPage, 8]
    //   let index = rawIndex.toString()

    //   this.setState({ loadMore: true })
    //   axios.get('https://ec-test.mooimom.tnpgroup.co/web/product/list', {
    //     params: {
    //       category_id: category_id,
    //       index: index
    //     }
    //   })
    //     .then((res) => {
    //       var arr = [...this.state.newProducts]
    //       arr = arr.concat(res.data.product_list)
    //       this.setState({
    //         newProducts: arr,
    //         loadMore: false
    //       })
    //     })
    // }
    this.getHomepageData(currentPage)
  }

  sortProducts() {
    this.setState({ loading: true, sortOptionModal: false })

    axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/product/list', {
      params: {
        order_by: this.state.selectedSort
      }
    })
      .then((res) => {
        console.log('WEaa', res.data)
        this.getAttributes(res.data.attribute_count)
        this.setState({ newProducts: res.data.product_list, loading: false })
      })

      .catch(err => {
        this.setState({ loading: false })
        console.log("ERR", err)
      })
  }

  filterProducts() {
    let rawAttributes = [this.state.selectedSize, this.state.selectedColor]
    let attributes = rawAttributes.toString()

    this.setState({ loading: true, filterOptionModal: false })

    axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/product/list', {
      params: {
        attribute_value_id: attributes
      }
    })
      .then((res) => {
        console.log('WEaa', res.data)
        this.setState({ newProducts: res.data.product_list, loading: false })
      })

      .catch(err => {
        this.setState({ loading: false })
        console.log("ERR", err)
      })
  }

  getHomepageData(currentPage) {
    if (this.props.navigation.state.params.category_id && this.props.navigation.state.params.category_data) {
      let category_id = this.props.navigation.state.params.category_id
      let category_data = this.props.navigation.state.params.category_data
      let rawIndex = [currentPage, 8]
      let index = rawIndex.toString()

      this.setState({ loading: true })
      axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/product/list', {
        params: {
          category_id: category_id,
          index: index
        }
      })
        .then((res) => {
          console.log('WE', res.data, 'Cat_ID : ', category_id)
          console.log('MEW', category_data)
          this.getAttributes(res.data.attribute_count)

          var arr = [...this.state.newProducts]
          arr = arr.concat(res.data.product_list)

          this.setState({
            newProducts: arr,
            currentPage: currentPage,
            subCategory: category_data,
            loading: false
          })
        })
    }
    else {
      this.setState({ loading: true })
      axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/product/list')
        .then((res) => {
          console.log('WE', res.data)
          this.getAttributes(res.data.attribute_count)
          this.setState({ newProducts: res.data.product_list, loading: false })
        })
    }
  }

  getAttributes(providedAttributes) {
    axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/attribute/all')
      .then((res) => {
        console.log('AW', res.data, providedAttributes)

        let sizes = res.data[0]
        let colors = res.data[1]
        let finalProvidedAttributes = Object.entries(providedAttributes)

        finalProvidedAttributes.map(attId => {
          console.log("attId", attId[0])
          sizes.attribute_values.map(sizeItem => {
            if (sizeItem.id == attId[0]) {
              this.setState({
                sizeOptions: [...this.state.sizeOptions, sizeItem]
              })
            }
          })

          colors.attribute_values.map(colorItem => {
            if (colorItem.id == attId[0]) {
              this.setState({
                colorOptions: [...this.state.colorOptions, colorItem]
              })
            }
          })
        })
      })
  }

  renderSubCategoryFlatList(item, index) {
    return (
      <TouchableOpacity style={{
        width: 100,
        height: 100,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 4,
      }}>
        <Image source={{ uri: item.item.image_icon }} style={{ width: 40, height: 60 }} />
        <Text numberOfLines={2} ellipsizeMode={"tail"} style={{ fontFamily: Fonts.type.gotam4, fontSize: Metrics.fontSize0, color: Colors.black, marginTop: 5 }}>{item.item.name}</Text>
      </TouchableOpacity>
    )
  }

  renderNewProduct({ item, index }) {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.navigate_to('NewProductScreen', { selectedProduct: item })}
      // onPress={() => this.navigate_to('ProductScreen', {
      //   product_slug: item.slug,
      //   auth: this.props.auth
      // })} 
      >
        <View style={{ marginHorizontal: 10 }}>
          <NewProductCard
            product={item}
          // auth={this.props.auth}
          // sharedProductProcess={this.props.sharedProductProcess}
          // addWishlistProductProcess={this.props.addWishlistProductProcess}
          // deleteWishlistProductProcess={this.props.deleteWishlistProductProcess}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderFilterOptionModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.filterOptionModal}
        onRequestClose={() => {
          this.setState({
            filterOptionModal: false
          })
        }}>
        <TouchableOpacity
          style={{
            width: Metrics.screenWidth,
            height: Metrics.screenHeight,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'flex-end'
          }}
          activeOpacity={1}
          onPressOut={() => this.setState({
            filterOptionModal: false
          })}
        />
        <View style={{ width: '100%', height: Metrics.screenHeight - 50, top: 50, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white, position: 'absolute' }}>
          <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomColor: Colors.mediumGray, borderBottomWidth: 0.5, paddingVertical: 20, marginBottom: 20 }}>
            <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black }}>Filter</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SizeFilter
              options={this.state.sizeOptions}
              onSelected={(isSelected) => this.setState({ isSizeFilterSelected: isSelected })}
              onSelected2={(value) => this.setState({ selectedSize: value })}
            />
            <View style={{ marginVertical: 10 }} />
            <ColorFilter
              options={this.state.colorOptions}
              onSelected={(isSelected) => this.setState({ isColorFilterSelected: isSelected })}
              onSelected2={(value) => this.setState({ selectedColor: value })}
            />
            {/* <View style={{ marginVertical: 10 }} />
            <PriceRangeFilter
            /> */}
            <TouchableOpacity
              onPress={() => this.filterProducts()}
              style={{ width: '90%', borderRadius: 20, backgroundColor: Colors.mooimom, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, alignSelf: 'center', marginTop: 20 }}>
              <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white }}>Ok</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 50 }} />
          </ScrollView>
        </View>
      </Modal >
    )
  }

  renderSortOptionModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.sortOptionModal}
        onRequestClose={() => {
          this.setState({
            sortOptionModal: false
          })
        }}>
        <TouchableOpacity
          style={{
            width: Metrics.screenWidth,
            height: Metrics.screenHeight,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'flex-end'
          }}
          activeOpacity={1}
          onPressOut={() => this.setState({
            sortOptionModal: false
          })}
        >
          {/* <TouchableWithoutFeedback>
            <View style={styles.chooseDeliveryWrapper3}>
              <TouchableOpacity style={styles.chooseDeliveryBtn2} onPress={() => this.setState({
                jneSelected: false,
                isShowDelivery: true
              })}>
                <Image source={Images.x} style={styles.imageClose} />
                <Text style={styles.chooseDeliveryText2}>Pilih Opsi Pengiriman</Text>
              </TouchableOpacity>
              {this._renderJNEDeliveriesOption()}
            </View>
          </TouchableWithoutFeedback> */}
          <View style={{ width: '100%', height: Metrics.screenHeight - 50, top: 50, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: Colors.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomColor: Colors.mediumGray, borderBottomWidth: 0.5, paddingVertical: 20, marginBottom: 20 }}>
                <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black }}>Sort</Text>
              </View>
              <SortOption onSelected={(value) => this.setState({ selectedSort: value })} sortOptions={this.state.sortOptions} />
              <View style={{ marginVertical: 10 }} />
              <TouchableOpacity
                onPress={() => this.sortProducts()}
                style={{ width: '90%', borderRadius: 20, backgroundColor: Colors.mooimom, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.white }}>Ok</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 50 }} />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  render() {
    return (
      <SafeAreaView>
        <LinearGradient colors={['#8df2e5', '#28C9B9']} style={{ width: '100%', height: 60 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Metrics.screenWidth - 40,
            marginHorizontal: 20,
            alignItems: 'center',
            height: 60
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <TouchableOpacity onPress={() => this.navigate_to('NewCategoryScreen')}>
                <Image source={Images.menuLogo} style={{
                  height: 16 * Metrics.screenWidth / 320,
                  width: 16 * Metrics.screenWidth / 320,
                  marginRight: 20,
                  marginTop: 5,
                  resizeMode: 'contain'
                }} />
              </TouchableOpacity>
              <Image source={Images.mooimomLogoWhite} style={{
                width: Metrics.screenWidth / 3,
                maxHeight: 30,
                resizeMode: 'contain'
              }} />
            </View>
            <View style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <TouchableOpacity onPress={() => this.navigate_to('SearchScreen')}>
                <Image source={Images.search2} style={{
                  height: 18 * Metrics.screenWidth / 320,
                  width: 18 * Metrics.screenWidth / 320,
                  marginLeft: 18,
                  resizeMode: 'contain'
                }} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.loadMoreData()
            }
          }}
          scrollEventThrottle={0}
        >
          {/* {
            !this.state.loading ? */}
          <>
            <View style={{ width: '100%', backgroundColor: Colors.mooimom, height: 120, marginBottom: 20 }} />
            <View style={{ width: '100%', alignItems: 'center' }}>
              <FlatList
                data={this.state.subCategory}
                renderItem={this.renderSubCategoryFlatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginRight: 10 }} />}
                ListHeaderComponent={<View style={{ marginLeft: 10 }} />}
              />
            </View>
            <View style={{
              width: '94%',
              height: 50,
              alignSelf: 'center',
              borderRadius: 10,
              marginVertical: 20,
              backgroundColor: Colors.white,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,
              elevation: 2,
            }} >
              <TouchableOpacity onPress={() => this.setState({ sortOptionModal: true })} style={{ flex: 2, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black }}>Sort</Text>
              </TouchableOpacity>
              <View style={{ width: 1, height: 30, backgroundColor: Colors.mediumGray }} />
              <TouchableOpacity onPress={() => this.setState({ filterOptionModal: true })} style={{ flex: 2, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black }}>Filter</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              <FlatList
                data={this.state.newProducts}
                renderItem={this.renderNewProduct}
                showsVerticalScrollIndicator={false}
                numColumns={2}
              />
              {/* {this.state.loadMore &&
                    <View style={{ marginVertical: 10 }}>
                      <DotIndicator size={10} color={Colors.mediumGray} />
                    </View>
                  } */}
            </View>
            <View style={{ marginTop: 50 }} />
            {this.renderSortOptionModal()}
            {this.renderFilterOptionModal()}
          </>
          {/* :
              // <View style={{ flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight - 40, justifyContent: 'center', alignItems: 'center' }}>
              //   <DotIndicator size={14} color={Colors.mooimom} />
              // </View> */}
          {/* // } */}
        </ScrollView>
      </SafeAreaView >
    )
  }
}