import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';
import { connect } from 'react-redux'

// Styles
import styles from './Styles/LearnScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

class LearnScreen extends Component {
  static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => {
          const iconName = (focused ? Images.learn2 : Images.learn)
          return <Image source={iconName} style={menuStyles.menuImage}/>
      },
  };
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0,
      learnpages:[
        {image:Images.learnpage1, title:'Jadilah Reseller', desc:'Berbagi dengan semua ibu di Indonesia dan\ndapatkan keuntungan.'},
        {image:Images.learnpage2, title:'Jelajahi Produk', desc:'Temukan semua produk kebutuhan ibu hamil,\npasca melahirkan, masa menyusui, dan produk\nbayi yang berkualitas.'},
        {image:Images.learnpage3, title:'Bagikan Produk', desc:'Tawarkan produk ke semua teman dan\nkomunitas Moms melalui Whatsapp, Instagram\nFacebook, dan lainnya.'},
        {image:Images.learnpage4, title:'Mulai Berjualan', desc:'Moms sudah menjadi seorang wirausaha hanya\ndengan menawarkan dan memesan produk\nuntuk para Moms di aplikasi tanpa harus ribet\npacking dan kirim.'},
        {image:Images.learnpage5, title:'Dapatkan Komisi', desc:'Moms akan mendapat komisi untuk produk yang\ndipesan di aplikasi. Semakin banyak pesanan,\nsemakin besar komisi-nya sesuai dengan target\nyang dicapai.'},
        {image:Images.learnpage6, title:'Bagikan & Hasilkan', desc:'Semakin banyak Moms berbagi produk ke semua\nteman dan komunitas, semakin besar\npenghasilan yang didapat Moms setiap minggu.'}
      ]
    }
  }

  actNavigate(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  _renderLearn ({item, index}, parallaxProps) {
        return (
            <View style={styles.itemHeroBanner}>
                <Image
                    source={item.image}
                    style={styles.imageHeroBanner}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
            </View>
        );
    }

  render () {
    return (
      <View style={styles.container}>
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
        <View style={styles.containerScroll}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
          <Carousel
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={Metrics.screenWidth}
            sliderHeight={Metrics.screenHeight}
            itemWidth={Metrics.screenWidth}
            data={this.state.learnpages}
            renderItem={this._renderLearn}
            hasParallaxImages={false}
            lockScrollWhileSnapping={true}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          />
          <Pagination
            dotsLength={this.state.learnpages.length}
            activeDotIndex={this.state.activeSlide}
            dotStyle={styles.paginationDotStyleHeroBanner}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={styles.paginationContainerStyleHeroBanner}
            dotContainerStyle={styles.paginationDotContainerStyleHeroBanner}
          />
          </ScrollView>
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
)(LearnScreen)
