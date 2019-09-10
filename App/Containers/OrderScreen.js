import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, FlatList} from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/OrderScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

var dataOrder = [
  {status:'Pembayaran', statusname:'Menunggu Pembayaran',orderID:'#12345345', orderDate:'2019-09-03', products:[
    {
      name:'Full Coverage Seamless Maternity & Nursing Bra', price: 350000, images: [
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
      ]
    }
    ]
  },
  {status:'Selesai', statusname: 'Pesanan Selesai', orderID:'#3328127638', orderDate:'2019-09-03', products:[
    {
      name:'Bamboo Postpartum Belly Band Corset', price: 920000, images: [
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/05/08/main-c7889-1-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-4.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-5.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-3.jpg'},
      ]
    }
    ]
  },
  {status:'Dibatalkan', statusname: 'Pesanan Dibatalkan', orderID:'#127839876', orderDate:'2019-09-07', products:[
    {
      name:'Mooimom Casual Hipseat Carrier', price: 399000, images: [
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/04/30/h9502-1-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/05/01/1556697513950-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/04/30/h9502-2-compressor.jpg'},
      ]
    }
    ]
  },
  {status:'Selesai', statusname: 'Pesanan Selesai', orderID:'#77282821', orderDate:'2019-08-11', products:[
    {
      name:'Sloped Pillow Bantal Bayi', price: 449000, images: [
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/06/24/q90301-2.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/07/01/q90801_1.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/08/30/pillow-for-baby-4-4.jpg'},
      ]
    }
    ]
  }
]

class OrderScreen extends Component {
  static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = (focused ? Images.order2 : Images.order)
          return <Image source={iconName} style={menuStyles.menuImage}/>
      },
  };
  constructor (props) {
    super(props)
    this.state = {
      menuStatus: ['Semua', 'Pembayaran', 'Diproses', 'Selesai', 'Dibatalkan'],
      selectedMenuIdx: 0,
      orders:dataOrder
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  _renderMenuStatus({item, index}){
    var style = styles.menuBtn
    var styleText = styles.menuText
    if(index === this.state.selectedMenuIdx){
      style = styles.menuBtn2
      styleText = styles.menuText2
    }
    return(
      <TouchableOpacity onPress={() => this.setState({
        selectedMenuIdx: index
      })}>
        <View style={style}>
            <Text style={styleText}>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderOrders({item, index}){
    if(item.status === this.state.menuStatus[this.state.selectedMenuIdx] || this.state.selectedMenuIdx === 0){
      return (
        <View style={styles.orderContainer}>
          <View style={styles.orderContainerTop}>
            <Text style={styles.orderStatusText}>{item.statusname}</Text>
          </View>
          <View style={styles.orderContainerMid}>
            <Text style={styles.orderDateText}>{item.orderDate}</Text>
            <Text style={styles.orderIDText}>No Order {item.orderID}</Text>
          </View>
          <View style={styles.orderContainerBottom}>
            <View style={styles.orderContainerProductWrapper}>
              <View style={styles.orderContainerLeft}>
                <Image source={{uri:item.products[0].images[0].url}} style={styles.productImage}/>
              </View>
              <View style={styles.orderContainerRight}>
                <Text style={styles.productName}>{item.products[0].name}</Text>
                <Text style={styles.productPrice}>{convertToRupiah(item.products[0].price)}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return <View/>
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
              <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
              <View style={styles.topContainer}>
                <TouchableOpacity>
                  <Text style={styles.textTarget}>Target Bonus Minggu Ini</Text>
                  <Text style={styles.textTargetAmount}>Rp500.000</Text>
                  <Text style={styles.textTargetMore}>Raih Target dan dapatkan bonus lebih banyak</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.wrapperSeparator}/>
              <View style={styles.bottomContainer}>
                <Text style={styles.textMenuStatus}>Pesanan Saya</Text>
                <View style={styles.menuStatus}>
                  <FlatList
                    data={this.state.menuStatus}
                    renderItem={this._renderMenuStatus.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    extraData={this.state}
                  />
                </View>
                <View style={styles.wrapperSeparator}/>
                <View style={styles.listOrders}>
                  <FlatList
                    data={this.state.orders}
                    renderItem={this._renderOrders.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderScreen)
