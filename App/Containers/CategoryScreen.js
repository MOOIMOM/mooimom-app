import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, SectionList, BackHandler } from 'react-native'
import { Images, Metrics } from '../Themes'
import ProductCardSingle from '../Components/ProductCardSingle'
import { connect } from 'react-redux'

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
    var dataCategories = [
      {id:'1', category:'Masa Kehamilan', subcategory:[
        {id:'1', title:'Aksesoris', data:[
          {id:'1', name:'Belly Cream', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2019/08/30/sc7001-9.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'2', name:'Maternity Belt', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2018/03/01/maternity-belt-1-compressor.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'3', name:'Bantal Hamil', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2019/08/22/q90802-2.jpg__600x800_q85_subsampling-2.jpg'},
        ]},
        {id:'2', title:'Maternity Wear', data:[
          {id:'4', name:'Celana Hamil', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2017/07/13/m7502-01.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'5', name:'Bra / Brief Hamil', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2017/06/15/3-pack-b6886-600x800px.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'6', name:'Baju Hamil', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2019/05/21/n8063-1-compressor.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'7', name:'Baju Renang Hamil', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2018/01/15/w7002-1-compressor.jpg__600x800_q85_subsampling-2.jpg'},
        ]},
      ]},
      {id:'2', category:'Masa Menyusui', subcategory:[
        {id:'3', title:'Aksesoris', data:[
          {id:'8', name:'Breast Pump', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2019/07/01/electric-breast-pump-1.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'9', name:'Breast Pad', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2018/09/05/4-pack-a6001-compressor.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'10', name:'Storage Bag', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2019/02/14/a8006-5-compressor.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'11', name:'Bantal Menyusui', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/08/30/q90302-5.jpg'},
          {id:'12', name:'Nursing Cover / Scarf', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2017/06/19/g7001f_wn-1.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'13', name:'Diaper Bag', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2019/08/26/tas-2-4.jpg'},
        ]},
        {id:'4', title:'Breastfeeding Wear', data:[
          {id:'14', name:'Bra Menyusui', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2017/06/15/crossover-navy-1.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'15', name:'Baju Menyusui', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2018/02/02/n7024-pink-2-compressor.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'16', name:'Baju Couple', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2018/01/30/p7007-blue-5-compressor.jpg__600x800_q85_subsampling-2.jpg'},
        ]},
      ]},
      {id:'3', category:'Pasca Melahirkan', subcategory:[
        {id:'5', title:'Korset', data:[
          {id:'17', name:'Bamboo Corset', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2019/07/01/electric-breast-pump-1.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'18', name:'Korset Pelangsing', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2018/09/05/4-pack-a6001-compressor.jpg__600x800_q85_subsampling-2.jpg'},
        ]},
        {id:'2', title:'Shaper', data:[
          {id:'19', name:'Slimming Suit', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2017/06/15/crossover-navy-1.jpg__600x800_q85_subsampling-2.jpg'},
          {id:'20', name:'Slimming Bottom', images:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public_thumbnails/filer_public/2018/02/02/n7024-pink-2-compressor.jpg__600x800_q85_subsampling-2.jpg'},
        ]},
      ]},
      {id:'4', category:'Perlengkapan Bayi', subcategory:[
        {id:'6', title:'Outdoor & Travel', data:[
          {id:'21', name:'Hipseat Carrier', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'22', name:'Baby Ring Sling', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'23', name:'Diaper Bag', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'24', name:'Sterilizer', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'25', name:'Storage Bag', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'26', name:'Nursing Cover', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
        ]},
        {id:'7', title:'Bath / Health', data:[
          {id:'27', name:'Bath / Skin Care', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'28', name:'Anti Gigitan Nyamuk', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
        ]},
        {id:'8', title:'Bedding / Toys', data:[
          {id:'29', name:'Baby Pillow', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'30', name:'Baby Teether', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
        ]},
        {id:'9', title:'Feeding', data:[
          {id:'31', name:'Sterilizer', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'32', name:'Botol Susu', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'33', name:'Training Bottle', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'34', name:'Training Spoon / Mangkok', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'35', name:'Storage Bags', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'36', name:'Straw', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
        ]},
        {id:'10', title:'Daily Clean', data:[
          {id:'37', name:'Baby Wipes', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'38', name:'Toothpaste / Toothbrush', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'39', name:'Hand Sanitizer', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'40', name:'Sabun Cuci Botol', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'41', name:'Detergent / Softener', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
          {id:'42', name:'Diapers', images:'https://screenshotlayer.com/images/assets/placeholder.png'},
        ]},
      ]},
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
      categories: dataCategories,
      selectedCategoriesIdx: 0,
      selectedSubCategoriesId: 0,
      selectedSubCategoriesIdx: 0,
      isSelectSubCategory: false,
      arrTopCategory:[],
      products: dataProducts
    }
    this._renderCategories = this._renderCategories.bind(this)
    this._renderSubCategories = this._renderSubCategories.bind(this)
    this._renderCategoryView = this._renderCategoryView.bind(this)
    this._renderSubCategoryView = this._renderSubCategoryView.bind(this)
    this._renderTopCategories = this._renderTopCategories.bind(this)
    this._renderProduct = this._renderProduct.bind(this)
    this._onLayout = this._onLayout.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillReceiveProps(newProps){
    if(newProps.navigation.state.params.category_id !== this.state.selectedCategoriesIdx){
      this.setState({
        selectedCategoriesIdx: newProps.navigation.state.params.category_id
      })
    }
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

  moveToSubCategories(id){
    var idx = this.state.selectedCategoriesIdx
    var arrTopCategory = []
    this.state.categories[idx].subcategory.map((category) => {
      category.data.map((data) => {
        var obj = {}
        obj.name = data.name
        obj.id = data.id
        arrTopCategory.push(obj)
      })
    })
    var index = arrTopCategory.findIndex(item => item.id === id)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.setState({
      isSelectSubCategory: true,
      arrTopCategory:arrTopCategory,
      selectedSubCategoriesId: id,
      selectedSubCategoriesIdx: index
    })
  }

  _renderCategories({item, index}){
    let style = styles.categoryView
    if(this.state.selectedCategoriesIdx === index){
      style = styles.categoryView2
    }
    return (
      <TouchableOpacity
      onPress={() => this.setState({
        selectedCategoriesIdx: index
      })}
      >
        <View style={style}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderTopCategories({item, index}){
    let styleBtn = styles.btnTopCategories
    let styleText = styles.textBtnTopCategories
    if(this.state.selectedSubCategoriesId === item.id){
      styleBtn = styles.btnTopCategoriesSelected
      styleText = styles.textBtnTopCategoriesSelected
    }
    return (
      <TouchableOpacity style={styleBtn}
      onPress={() => this.setState({
        selectedSubCategoriesId: item.id,
        selectedSubCategoriesIdx: index
      })}
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

      items.push(
        <TouchableWithoutFeedback key={section.data[i].id} onPress={() => {
          this.moveToSubCategories(section.data[i].id)
        }}>
          <View style={styles.productContainer}>
            <Image source={{uri:section.data[i].images}} style={styles.productImage}/>
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
        onPress={() => navigate('ProductScreen', {
          product: item
        })}
      >
        <View>
          <ProductCardSingle
            product={item}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderCategoryView(){
    return (
      <View style={styles.containerScroll}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.searchButton} onPress={() => this.navigate_to('SearchScreen')}>
            <Image source={Images.search} style={styles.imageSearch}/>
            <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHeader} onPress={() => this.navigate_to('CartScreen')}>
            <Image source={Images.shoppingCartBlack} style={styles.imgHeader}/>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperSeparator}/>
        <View style={styles.contentContainer}>
          <View style={styles.leftContainer}>
            <FlatList
              extraData={this.state.selectedCategoriesIdx}
              data={this.state.categories}
              renderItem={this._renderCategories}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.rightContainer}>
            <SectionList
              renderItem={this._renderSubCategories}
              renderSectionHeader={this._renderSectionHeader}
              sections={this.state.categories[this.state.selectedCategoriesIdx].subcategory}
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
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.products}
              renderItem={this._renderProduct}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    )
  }

  render () {
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

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryScreen)
