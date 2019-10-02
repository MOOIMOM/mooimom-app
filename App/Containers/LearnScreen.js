import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, FlatList, Linking } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';
import { connect } from 'react-redux'
import GetQuestionActions from '../Redux/GetQuestionRedux'
import GetArticleActions from '../Redux/GetArticleRedux'
import GetVideoActions from '../Redux/GetVideoRedux'

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
      activeMenu: 'video',
      video: [],
      article: [],
      question: []
    }
  }

  componentDidMount(){
    let data = {
      data_request:{
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getVideoProcess(data)
    this.props.getArticleProcess(data)
    this.props.getQuestionProcess(data)
  }

  componentWillReceiveProps(newProps){
    if(newProps.video !== this.props.video){
      if (
        newProps.video.payload !== null &&
        newProps.video.error === null &&
        !newProps.video.fetching
      ) {
        this.setState({
          video: newProps.video.payload.youtube_videos
        })
      }
    }

    if(newProps.article !== this.props.article){
      if (
        newProps.article.payload !== null &&
        newProps.article.error === null &&
        !newProps.article.fetching
      ) {
        this.setState({
          article: newProps.article.payload.articles
        })
      }
    }

    if(newProps.question !== this.props.question){
      if (
        newProps.question.payload !== null &&
        newProps.question.error === null &&
        !newProps.question.fetching
      ) {
        this.setState({
          question: newProps.question.payload.all_qa
        })
      }
    }
  }

  actNavigate(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  openVideo(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  openArticle(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  pressMenu(menu){
    if(this.state.activeMenu !== menu){
      this.setState({
        activeMenu: menu
      })
    }
  }

  isSelected(menu){
    if(this.state.activeMenu === menu){
      return {backgroundColor: Colors.mooimom}
    }
  }

  isSelectedText(menu){
    if(this.state.activeMenu === menu){
      return {color: Colors.white}
    }
  }

  _renderVideo({item, index}){
    return (
      <TouchableOpacity onPress={() => this.openVideo(item.youtube_url)}>
        <View style={styles.videoItem}>
          <Image source={{uri:item.image_for_youtube}} style={styles.imageItem}/>
          <View style={styles.descItem}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.titleText2}>durasi: {item.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderArticle({item, index}){
    return (
      <TouchableOpacity onPress={() => this.openArticle(item.article_url)}>
        <View style={styles.videoItem}>
          <Image source={{uri:item.image_for_article}} style={styles.imageItem}/>
          <View style={styles.descItem}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.titleText2}>waktu baca: {item.read_time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderQuestion({item, index}){
    return (
      <TouchableOpacity>
        <View style={styles.videoItem}>
          <Image source={{uri:item.image}} style={styles.imageItem}/>
          <View style={styles.descItem}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
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
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => this.pressMenu('video')}>
              <View style={[styles.menuButton, this.isSelected('video')]}>
                <Text style={[styles.menuText, this.isSelectedText('video')]}>Video</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pressMenu('article')}>
              <View style={[styles.menuButton, this.isSelected('article')]}>
                <Text style={[styles.menuText, this.isSelectedText('article')]}>Artikel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pressMenu('question')}>
              <View style={[styles.menuButton, this.isSelected('question')]}>
                <Text style={[styles.menuText, this.isSelectedText('question')]}>Pusat Bantuan</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
            {this.state.activeMenu === 'video' &&
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.video}
              renderItem={this._renderVideo.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />}
            {this.state.activeMenu === 'article' &&
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.article}
              renderItem={this._renderArticle.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />}
            {this.state.activeMenu === 'question' &&
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.question}
              renderItem={this._renderQuestion.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />}
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    question: state.question,
    article: state.article,
    video: state.video
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getArticleProcess: data => {
      dispatch(GetQuestionActions.getQuestionRequest(data))
    },
    getQuestionProcess: data => {
      dispatch(GetArticleActions.getArticleRequest(data))
    },
    getVideoProcess: data => {
      dispatch(GetVideoActions.getVideoRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnScreen)
