import React from 'react'
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'

export default class CategoriesDropdown extends React.Component {
  state = {
    isSelected: false,
  }

  renderSubCategories(item, index) {
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick(item.item)}
        key={index} style={{ width: 60, height: 90, marginTop: 20, marginHorizontal: 10 }}>
        <View style={{ width: 60, height: 60, backgroundColor: item.item.image !== "" ? '' : Colors.gray, bottom: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: item.item.image_icon }} style={{ width: 50, height: 60 }} />
        </View>
        <Text style={{ color: Colors.black, fontFamily: Fonts.type.gotham1, textAlign: 'center', fontSize: 12 }}>{item.item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { categories } = this.props;

    return (

      <View style={{ paddingBottom: 20, borderBottomWidth: 0.5, borderBottomColor: Colors.gray, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => {
          this.setState({
            isSelected: !this.state.isSelected
          })
        }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
          <Text style={{ fontFamily: Fonts.type.gotham1, color: Colors.black }}>{categories.name}</Text>
          <Image source={Images.down} style={{ width: 12, height: 12, transform: [{ rotate: this.state.isSelected ? '180deg' : '0deg' }] }} />
        </TouchableOpacity>

        {this.state.isSelected &&
          <View style={{ marginTop: 20, justifyContent: 'center' }}>
            <FlatList
              data={categories.subcategory}
              renderItem={this.renderSubCategories.bind(this)}
              numColumns={4}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        }
      </View>
    )

  }
}