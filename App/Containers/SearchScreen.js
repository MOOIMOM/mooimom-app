import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Alert, FlatList } from 'react-native'
import { Images, Metrics } from '../Themes'
import ProductCardSingle from '../Components/ProductCardSingle'
import { connect } from 'react-redux'
import {convertToRupiah} from '../Lib/utils'

// Styles
import styles from './Styles/SearchScreenStyles'
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
class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search:'',
      products:[]
    }
  }

  actNavigate (screen , obj = {}) {
    const { navigate } = this.props.navigation
    navigate(screen, obj)
  }

  processSearch(){
    this.setState({
      products:dataProducts
    })
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
          <ProductCardSingle
            product={item}
            sharedProductProcess={this.props.sharedProductProcess}
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
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.products}
                renderItem={this._renderProduct.bind(this)}
                keyExtractor={(item, index) => index.toString()}
              />
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
)(SearchScreen)
