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
        {image:Images.learnpage1, title:'Jadi Reseller Sukses', desc:'Berbagi dengan semua ibu di Indonesia dan dapatkan keuntungan'},
        {image:Images.learnpage2, title:'Jelajahi Produk Terbaik', desc:'MOOIMOM menawarkan produk terbaik untuk memenuhi kebutuhan ibu hamil, pasca melahirkan, menyusui, dan produk bayi dengan kualitas terbaik.'},
        {image:Images.learnpage3, title:'Sharing is Caring', desc:'Tawarkan semua produk bermanfaat untuk para sahabat, teman, hingga komunitas melalui Whatsapp, Instagram, Facebook, dan lainnya.'},
        {image:Images.learnpage4, title:'Berjualan Anti Ribet', desc:'Tawarkan dan pesan produk untuk para pelanggan Anda lewat aplikasi. Kami yang akan packing dan kirim barang. Easy & simple.'},
        {image:Images.learnpage5, title:'Komisi Menarik', desc:'Dapatkan komisi untuk produk yang dipesan melalui aplikasi. Tingkatkan jumlah pesanan untuk mendapatkan komisi yang lebih besar.'},
        {image:Images.learnpage6, title:'Simply Share & Earn', desc:'Tak ada yang lebih menyenangkan daripada mendapatkan uang tambahan tanpa meninggalkan peran sebagai ibu. Hanya dengan share dan order di aplikasi, uang tambahan akan moms dapatkan.'}
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
          <View style={styles.bottom3}/>
          <View style={styles.bottom3}>
          <Pagination
            dotsLength={this.state.learnpages.length}
            activeDotIndex={this.state.activeSlide}
            dotStyle={styles.paginationDotStyleHeroBanner}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={styles.paginationContainerStyleHeroBanner}
            dotContainerStyle={styles.paginationDotContainerStyleHeroBanner}
          />
          </View>
          <View style={styles.bottom3}>
          {this.state.activeSlide === this.state.learnpages.length - 1 && <Text style={styles.gotoText} onPress={() => this.actNavigate('SignupScreen')}>Lanjut ></Text>}
          </View>
          </View>
      </View>
    )
  }
}

export default HowtoScreen
