import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';

// Styles
import styles from './Styles/HowtoScreenStyles'

class HowtoScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0,
      learnpages:[
        {image:Images.learnpage1, title:'Jadilah Reseller', desc:'Berbagi dengan semua ibu di Indonesia dan dapatkan keuntungan.'},
        {image:Images.learnpage2, title:'Jelajahi Produk', desc:'Temukan semua produk kebutuhan ibu hamil, pasca melahirkan, masa menyusui, dan produk bayi yang berkualitas.'},
        {image:Images.learnpage3, title:'Bagikan Produk', desc:'Tawarkan produk ke semua teman dan komunitas Moms melalui Whatsapp, Instagram Facebook, dan lainnya.'},
        {image:Images.learnpage4, title:'Mulai Berjualan', desc:'Moms sudah menjadi seorang wirausaha hanya dengan menawarkan dan memesan produk untuk para Moms di aplikasi tanpa harus ribet packing dan kirim.'},
        {image:Images.learnpage5, title:'Dapatkan Komisi', desc:'Moms akan mendapat komisi untuk produk yang dipesan di aplikasi. Semakin banyak pesanan, semakin besar komisi-nya sesuai dengan target yang dicapai.'},
        {image:Images.learnpage6, title:'Bagikan & Hasilkan', desc:'Semakin banyak Moms berbagi produk ke semua teman dan komunitas, semakin besar penghasilan yang didapat Moms setiap minggu.'}
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
          <View style={styles.bottom}>
          <Pagination
            dotsLength={this.state.learnpages.length}
            activeDotIndex={this.state.activeSlide}
            dotStyle={styles.paginationDotStyleHeroBanner}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={styles.paginationContainerStyleHeroBanner}
            dotContainerStyle={styles.paginationDotContainerStyleHeroBanner}
          />
          {this.state.activeSlide === this.state.learnpages.length - 1 && <Text style={styles.gotoText} onPress={() => this.actNavigate('SignupScreen')}>Lanjut ></Text>}
          </View>
      </View>
    )
  }
}

export default HowtoScreen
