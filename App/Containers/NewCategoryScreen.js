import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'

import CategoriesDropdown from '../Components/CategoriesDropdown'
import { DotIndicator } from 'react-native-indicators'
import axios from 'axios'

export default class NewCategoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryList: [],
      selectedCategoryId: 0
    }
  }

  async componentDidMount() {
    this.getCategoryList()
  }

  navigate_to(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  getCategoryList() {
    axios.get('https://mooimom-alpha.ec.tnpgroup.co/web/category/all')
      .then((res) => {
        console.log('WEw', res.data)
        this.setState({ categoryList: res.data })
      })
  }


  renderCategoriesFlatlist(item, index) {
    return (
      <TouchableOpacity onPress={() => this.setState({ selectedCategoryId: item.index })} key={index} style={{ width: 80, height: 100, marginLeft: 10, marginVertical: 40 }}>
        <View style={{ width: 80, height: 80, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: item.item.image_icon !== '' ? '' : Colors.mooimom, bottom: 5 }}>
          <Image source={{ uri: item.item.image_icon }} style={{ width: '100%', height: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
        </View>
        <Text style={{ color: this.state.selectedCategoryId === item.index ? Colors.mooimom : Colors.black, fontFamily: Fonts.type.gotham1, textAlign: 'center' }}>{item.item.name}</Text>
      </TouchableOpacity>
    )
  }

  renderSubCategoryDropdown(item, index) {
    console.log("SUBB", item.item)
    return (
      <CategoriesDropdown
        onClick={() => this.navigate_to('NewCategoryProductScreen', { category_id: 3, category_data: item.item.subcategory })}
        categories={item.item}
      />
    )
  }

  render() {
    return (
      <SafeAreaView>
        <LinearGradient colors={['#8df2e5', '#28C9B9']} style={{
          width: Metrics.screenWidth,
          height: 60 * Metrics.screenWidth / 320,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Image source={Images.closeLogo} style={{
            height: 14 * Metrics.screenWidth / 320,
            width: 14 * Metrics.screenWidth / 320,
            resizeMode: 'contain',
            marginLeft: 20
          }} /></TouchableOpacity>
          <Image source={Images.mooimomLogoWhite} style={{
            width: Metrics.screenWidth / 3,
            maxHeight: 30,
            resizeMode: 'contain'
          }} />
          <View style={{ marginRight: 20 }} />
        </LinearGradient>

        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.categoryList.length != 0 ?
              <>
                <FlatList
                  data={this.state.categoryList}
                  renderItem={this.renderCategoriesFlatlist.bind(this)}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  ListHeaderComponent={<View style={{ marginLeft: 20 }} />}
                  ListFooterComponent={<View style={{ marginRight: 30 }} />}
                />
                <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderTopColor: Colors.gray, borderBottomColor: Colors.gray, width: '90%', alignSelf: 'center', paddingHorizontal: 10, marginBottom: 20 }}>
                  <Text style={{ fontFamily: Fonts.type.gotham4, color: Colors.black, fontSize: Metrics.fontSize2, marginVertical: 20 }}>{this.state.categoryList[this.state.selectedCategoryId].name}</Text>
                </View>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                  <FlatList
                    data={this.state.categoryList[this.state.selectedCategoryId].subcategory}
                    renderItem={this.renderSubCategoryDropdown.bind(this)}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </>
              :
              <View style={{ flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight - 40, justifyContent: 'center', alignItems: 'center' }}>
                <DotIndicator size={14} color={Colors.mooimom} />
              </View>
          }
          <View style={{ marginTop: 100 }} />
        </ScrollView>
      </SafeAreaView >
    )
  }
}