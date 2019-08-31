import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableOpacity, TouchableWithoutFeedback , Image, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import { connect } from 'react-redux'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';
import ProductCard from '../Components/ProductCard'

// Styles
import styles from './Styles/HomeScreenStyles'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    var dataHeroBanner = [
      Images.banner2,
      Images.banner1,
      Images.banner3
    ]
    var dataPromoBanner = [
      {id: '1', image: Images.promo1},
      {id: '2', image: Images.promo2},
      {id: '3', image: Images.promo3}
    ]
    var dataProducts = [
      {id: '1', images: [
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
      ],
        name:'Full Coverage Seamless Maternity & Nursing Bra', price: 350000, discPrice: 0,
        description: `* Bahan : 85% Nylon, 15% Polyester
* Bahan yang sangat halus, tanpa jahitan, sentuhannya lembut pada setiap sisi tubuh
* Kancing Bra Menyusui yang sangat tahan lama, mudah digunakan dengan satu tangan, tertutup dan juga praktis
* Desain yang sempurna yang dapat mengikuti perubahan bentuk payudara dari masa kehamilan sampai menyusui
* Tanpa kawat, tidak menekan dan nyaman
* Memiliki elastisitas yang tinggi, cup bra bisa stretch sampai 2-3 cup, sehingga bisa menyesuaikan bentuk dan ukuran payudara pada saat kehamilan dan menyusui.
* Memiliki sirkulasi udara yang baik, sehingga tidak panas dan sangat nyaman saat menyusui

* Cara pencucian : Mesin Cuci / Suhu Rendah / Kantong Cuci / Jangan Direndam / Tanpa Pemutih / Tanpa Pengering

※ Pelanggan Yth., tampilan warna dapat berbeda pada setiap monitor komputer, warna standar adalah warna dari produk, sehingga harap perhatikan dengan seksama tabel ukuran pakaian & hasil uji pakaian sebelum melakukan pemesanan. Pilihlah ukuran yang sesuai dengan postur Anda.`
      },
      {id: '2', images: [
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/05/08/main-c7889-1-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-4.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-5.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-3.jpg'},
      ],
        name:'Bamboo Postpartum Belly Band Corset', price: 920000, discPrice: 200000,
        description: `Bamboo Postpartum Belly Band

* Anti Radiasi Elekromagnetik - Perlindungan terhadap gelombang radiasi elektromagnetik yang dapat menganggu kesehatan Anda
* Anti bau dan anti bakteri
* Ringan, dengan permeabilitas yang baik, lembut, efektif untuk mengencangkan panggul, perut dan pinggang pasca melahirkan.
* Bisa digunakan pasca melahirkan
* Mengatasi permasalahan perut buncit, sakit punggung karena posisi duduk yang salah/terlalu lama duduk
* Mengembalikan rahim ke posisi semula dan membantu mengecilkan rahim.
* Dengan 2 perekat tambahan, dan setiap bagian bisa ditempel sehingga bisa mengatur elastisitas sesuai dengan keinginan

Bahan : 41% Nylon, 16% Rayon, 24% Rubber Thread, 19% Bamboo Charcoal
Cara Perawatan & Pencucian : Disarankan handwash, jangan menggunakan mesin`
      },
      {id: '3', images: [
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/04/30/h9502-1-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/05/01/1556697513950-compressor.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/04/30/h9502-2-compressor.jpg'},
      ],
        name:'Mooimom Casual Hipseat Carrier', price: 399000, discPrice: 0,
        description: `* Bahan 100% Polyester
* Tali bahu empuk, lebar dan dapat diatur sesuai kebutuhan
* Mengurangi beban pada bahu dan pinggang saat menggendong bayi
* Menggendong bayi menjadi lebih stabil
* Cushion seat didesain ergonomis
* Ritsleting panel yang mudah dilepas pasang
* Waistband lebar, dilengkapi dengan velcro dan strap pengencang dan pengunci yang lebar
* Terdapat kantong di bagian sabuk pinggang untuk menyimpan barang
* Terdapat kantong jaring di bagian depan untuk menyimpan aksesoris lainnya

· Mampu menahan berat beban bayi hingga 20 kg
· Saran usia pemakaian : 3 - 36 bulan

Cara Perawatan & Pencucian :
· Bersihkan kotoran dengan handuk basah, jangan menggunakan mesin, lebih disarankan Handwash
· Keluarkan cushion seat sebelum dicuci
· Pencucian dipisahkan dengan pakaian yang mudah luntur
· Jangan gunakan pemutih
· Dijemur ditempat yang teduh`
      },
      {id: '4', images: [
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/06/24/q90301-2.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/07/01/q90801_1.jpg'},
        {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/08/30/pillow-for-baby-4-4.jpg'},
      ],
        name:'Sloped Pillow Bantal Bayi', price: 449000, discPrice: 0,
        description: `Bahan
Cover : 40% Bamboo Fiber, 60% Polyester
Lining : 100% Polyester
Filling : 100% Polyurethane (Memory Foam)
* Membantu bayi tidur dengan posisi badan bagian atas lebih tinggi
* Mencegah bayi muntah/gumoh, membantu mengurangi hidung tersumbat saat flu ataupun infeksi pernapasan
* Sudut kemiringan bantal 10 derajat
* Multifungsi sebagai bantal hamil maupun bantal bayi
* Busa bantal berupa memory foam yang lembut dan adem
* Sarung bantal bisa dilepas pasang dan dicuci
* Tidak mudah berubah bentuk
* Lapisan luar bantal terbuat dari serat bambu yang adem & anti bakteri
* Cocok untuk bayi usia 3 bulan keatas

Ukuran : Panjang 50.5 cm x Lebar 35 cm x Tinggi 7 cm`
      },
    ]
    this.state = {
      heroBanners: dataHeroBanner,
      promoBanners: dataPromoBanner,
      products: dataProducts,
      activeSlide: 0
    }

    this._renderProduct = this._renderProduct.bind(this)
  }

  _renderHeroBanner ({item, index}, parallaxProps) {
        return (
            <View style={styles.itemHeroBanner}>
                <ParallaxImage
                    source={item}
                    containerStyle={styles.imageContainerHeroBanner}
                    style={styles.imageHeroBanner}
                    parallaxFactor={0.6}
                    {...parallaxProps}
                />
            </View>
        );
    }

  _renderPromoBanner ({item, index}) {
      return (
        <View style={styles.itemPromoBanner}>
          <TouchableWithoutFeedback>
              <Image
                  source={item.image}
                  style={styles.imagePromoBanner}
              />
          </TouchableWithoutFeedback >
        </View>
      );
  }

  _renderProduct ({item, index}) {
    const { navigate } = this.props.navigation
    return (
      <TouchableWithoutFeedback
        onPress={() => navigate('ProductScreen', {
          product: item
        })}
      >
        <View>
          <ProductCard
            product={item}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
            <Image source={Images.homeBG} style={styles.backgroundImage} />
            <View style={styles.headerWrapper}>
              <View style={styles.headerWrapper1}>
                <View style={styles.headerButtonLeft}>
                  <Image source={Images.mooimomLogoWhite} style={styles.logo} />
                </View>
                <View style={styles.headerButtonRight}>
                  <Image source={Images.wishlist} style={styles.buttonHeader} />
                  <Image source={Images.shoppingCart} style={styles.buttonHeader} />
                  <Image source={Images.notifWhite} style={styles.buttonHeader} />
                </View>
              </View>
              <View style={styles.headerWrapper2}>
                <TouchableOpacity style={styles.searchButton}>
                  <Image source={Images.search} style={styles.imageSearch}/>
                  <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.heroBannerWrapper}>
              <Carousel
                sliderWidth={Metrics.screenWidth}
                sliderHeight={220}
                itemWidth={Metrics.screenWidth - 60}
                data={this.state.heroBanners}
                renderItem={this._renderHeroBanner}
                hasParallaxImages={true}
                autoplay={true}
                lockScrollWhileSnapping={true}
                loop={true}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              />
              <Pagination
                dotsLength={this.state.heroBanners.length}
                activeDotIndex={this.state.activeSlide}
                dotStyle={styles.paginationDotStyleHeroBanner}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={styles.paginationContainerStyleHeroBanner}
                dotContainerStyle={styles.paginationDotContainerStyleHeroBanner}
              />
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.categoryWrapper}>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catMasaKehamilan} style={styles.catImage}/>
                <Text style={styles.catText}>Masa Kehamilan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catMasaMenyusui} style={styles.catImage}/>
                <Text style={styles.catText}>Masa Menyusui</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catPascaMelahirkan} style={styles.catImage}/>
                <Text style={styles.catText}>Pasca Melahirkan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catProdukBayi} style={styles.catImage}/>
                <Text style={styles.catText}>Produk Bayi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catButton}>
                <Image source={Images.catGiftSet} style={styles.catImage}/>
                <Text style={styles.catText}>Gift Set</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.promotionWrapper}>
              <Text style={styles.subTitleWrapper}>Promo Saat Ini</Text>
              <FlatList
                horizontal
                data={this.state.promoBanners}
                renderItem={this._renderPromoBanner}
                keyExtractor={(item, index) => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.wrapperSeparator}/>
            <View style={styles.productWrapper}>
              <Text style={styles.subTitleWrapper}>Produk Terlaris</Text>
              <FlatList
                data={this.state.products}
                renderItem={this._renderProduct}
                keyExtractor={(item, index) => item.id}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
              />
            </View>
            </ScrollView>
          </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.home} style={styles.menuImage}/>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.learn} style={styles.menuImage}/>
            <Text style={styles.menuText}>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.category} style={styles.menuImage}/>
            <Text style={styles.menuText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.order} style={styles.menuImage}/>
            <Text style={styles.menuText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={Images.account} style={styles.menuImage}/>
            <Text style={styles.menuText}>Akun</Text>
          </TouchableOpacity>
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
)(HomeScreen)
