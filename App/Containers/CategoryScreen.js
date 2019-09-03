import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, SectionList } from 'react-native'
import { Images, Metrics } from '../Themes'
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
      {id:'1', category:'Masa Kehamilan'},
      {id:'2', category:'Masa Menyusui'},
      {id:'3', category:'Pasca Melahirkan'},
      {id:'4', category:'Perlengkapan Bayi'},
      {id:'5', category:'Gift Set'},
    ]
    var dataProductByCategories = [
      {category_id:'1', subCategory:[
        {
          title:'Bra Hamil',
          data:[
            {
              product_id: '1',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra',
              price: 350000,
              discPrice: 0,
            },
            {
              product_id: '2',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra 1',
              price: 270000,
              discPrice: 0,
            },
            {
              product_id: '3',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra 2',
              price: 275000,
              discPrice: 0,
            },
            {
              product_id: '91',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra 2',
              price: 275000,
              discPrice: 0,
            },
            {
              product_id: '92',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-3.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra 2',
              price: 275000,
              discPrice: 0,
            }
          ]
        },
        {
          title:'Baju Hamil',
          data:[
            {
              product_id: '4',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2017/11/20/c7889-3.jpg'},
              ],
              name:'Nursing Bra',
              price: 250000,
              discPrice: 0,
            },
          ]
        }
      ]},
      {category_id:'2', subCategory:[
        {
          title:'Bra Hamil 2',
          data:[
            {
              product_id: '5',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra',
              price: 350000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Baju Hamil 2',
          data:[
            {
              product_id: '6',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Nursing Bra',
              price: 250000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Maternity Belt',
          data:[
            {
              product_id: '7',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
              ],
              name:'Maternity Belt',
              price: 220000,
              discPrice: 0,
            },
          ]
        }
      ]},
      {category_id:'3', subCategory:[
        {
          title:'Bra Hamil',
          data:[
            {
              product_id: '8',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra',
              price: 350000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Baju Hamil',
          data:[
            {
              product_id: '9',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
              ],
              name:'Nursing Bra',
              price: 250000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Maternity Belt',
          data:[
            {
              product_id: '10',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
              ],
              name:'Maternity Belt',
              price: 220000,
              discPrice: 0,
            },
          ]
        }
      ]},
      {category_id:'4', subCategory:[
        {
          title:'Bra Hamil',
          data:[
            {
              product_id: '11',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra',
              price: 350000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Baju Hamil',
          data:[
            {
              product_id: '12',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
              ],
              name:'Nursing Bra',
              price: 250000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Maternity Belt',
          data:[
            {
              product_id: '13',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
              ],
              name:'Maternity Belt',
              price: 220000,
              discPrice: 0,
            },
          ]
        }
      ]},
      {category_id:'5', subCategory:[
        {
          title:'Bra Hamil',
          data:[
            {
              product_id: '14',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra',
              price: 350000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Bra 2 Hamil',
          data:[
            {
              product_id: '99',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b4-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b2-compressor.jpg'},
              ],
              name:'Full Coverage Seamless Maternity & Nursing Bra',
              price: 350000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Baju Hamil',
          data:[
            {
              product_id: '15',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-f1-compressor.jpg'},
              ],
              name:'Nursing Bra',
              price: 250000,
              discPrice: 0,
            },
          ]
        },
        {
          title:'Maternity Belt',
          data:[
            {
              product_id: '16',
              images: [
                {url:'https://dkpzhs366ovzp.cloudfront.net/media_root/filer_public/2018/11/21/b8003-b3-compressor.jpg'},
              ],
              name:'Maternity Belt',
              price: 220000,
              discPrice: 0,
            },
          ]
        }
      ]},
    ]
    this.state = {
      categories: dataCategories,
      subCategories: dataProductByCategories,
      selectedCategoriesIdx: 0
    }
    this._renderCategories = this._renderCategories.bind(this)
    this._renderSubCategories = this._renderSubCategories.bind(this)
  }

  componentWillReceiveProps(newProps){
    if(newProps.navigation.state.params.category_id !== this.state.selectedCategoriesIdx){
      this.setState({
        selectedCategoriesIdx: newProps.navigation.state.params.category_id
      })
    }
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

  _renderSubCategories({ section, index}){
    if (index % 3 !== 0) return null;
    const { navigate } = this.props.navigation
    const items = [];

    for (let i = index; i < index + 3; i++) {
      if (i >= section.data.length) {
        break;
      }

      items.push(
        <TouchableWithoutFeedback key={section.data[i].product_id} onPress={() => navigate('ProductScreen', {product: section.data[i]})}>
          <View style={styles.productContainer}>
            <Image source={{uri:section.data[i].images[0].url}} style={styles.productImage}/>
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

  render () {
    console.log(this.state.selectedCategoriesIdx)
    return (
      <View style={styles.container}>
        <View style={styles.backgroundHeader} />
        <View style={styles.containerScroll}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.searchButton}>
              <Image source={Images.search} style={styles.imageSearch}/>
              <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSeparator}/>
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <FlatList
                extraData={this.state.selectedCategoriesIdx}
                data={this.state.categories}
                renderItem={this._renderCategories}
                keyExtractor={(item, index) => item.id}
              />
            </View>
            <View style={styles.rightContainer}>
              <SectionList
                renderItem={this._renderSubCategories}
                renderSectionHeader={this._renderSectionHeader}
                keyExtractor={(item, index) => item.product_id}
                sections={this.state.subCategories[this.state.selectedCategoriesIdx].subCategory}
                showsVerticalScrollIndicator={false}
              />
            </View>
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
)(CategoryScreen)
