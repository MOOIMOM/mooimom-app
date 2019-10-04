import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, FlatList, Linking, WebView, AppState, ActivityIndicator, Modal } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import Carousel, { ParallaxImage, Pagination  } from 'react-native-snap-carousel';
import { connect } from 'react-redux'
import GetQuestionActions from '../Redux/GetQuestionRedux'
import GetArticleActions from '../Redux/GetArticleRedux'
import GetVideoActions from '../Redux/GetVideoRedux'
import FastImage from 'react-native-fast-image'
import Accordion from '../Components/Accordion'

// Styles
import styles from './Styles/LearnScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

var isReloadPage = false
var isReloadPageArticle = false
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
      appState: AppState.currentState,
      isShowVideo: false,
      isShowArticle: false,
      activeMenu: 'video',
      video: [],
      article: [],
      question: [],
      videoUrl: '',
      videoTitle: '',
      articleUrl: '',
      articleTitle: '',
      selectedQAIndex: 0,
      isShowQASub: false,
      selectedQAIndex2: 0,
      isShowQASub2: false,
      video_page: 1,
      article_page: 1,
    }
  }

  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange);
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

  componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
      this.setState({appState: nextAppState});
  }

  componentWillReceiveProps(newProps){
    if(newProps.video !== this.props.video){
      if (
        newProps.video.payload !== null &&
        newProps.video.error === null &&
        !newProps.video.fetching && !isReloadPage
      ) {
        this.setState({
          video: newProps.video.payload.youtube_videos
        })
      } else if(
        newProps.video.payload !== null &&
        newProps.video.error === null &&
        !newProps.video.fetching && isReloadPage
      ){
        var arr = [...this.state.video]
        arr = arr.concat(newProps.video.payload.youtube_videos)
        this.setState({
          video_page: this.state.video_page + 1,
          video: arr
        })
        isReloadPage = false
      }
    }

    if(newProps.article !== this.props.article){
      if (
        newProps.article.payload !== null &&
        newProps.article.error === null &&
        !newProps.article.fetching && !isReloadPageArticle
      ) {
        this.setState({
          article: newProps.article.payload.articles
        })
      } else if(
        newProps.article.payload !== null &&
        newProps.article.error === null &&
        !newProps.article.fetching && isReloadPageArticle
      ){
        var arr = [...this.state.article]
        arr = arr.concat(newProps.article.payload.articles)
        this.setState({
          article_page: this.state.article_page + 1,
          article: arr
        })
        isReloadPageArticle = false
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

  onEndReached(){
    if (!isReloadPage) {
      if (this.state.video_page + 1 <= this.props.video.payload.how_many_pages) {
        isReloadPage = true
        let data = {
          data_request:{
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
          }
        }
        this.props.getVideoProcess(data)
      }
    }
  }

  onEndReachedArticle(){
    if (!isReloadPageArticle) {
      if (this.state.article_page + 1 <= this.props.article.payload.how_many_pages) {
        isReloadPageArticle = true
        let data = {
          data_request:{
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
          }
        }
        this.props.getArticleProcess(data)
      }
    }
  }

  openVideo(url, title){
    this.setState({
      videoUrl: url,
      videoTitle: title,
      isShowVideo: true,
    })
  }

  openArticle(url, title){
    this.setState({
      articleUrl: url,
      articleTitle: title,
      isShowArticle: true,
    })
  }

  openQuestion(index){
    this.setState({
      selectedQAIndex: index,
      isShowQASub: true
    })
  }

  openQuestionSub(index){
    this.setState({
      selectedQAIndex2: index,
      isShowQASub2: true
    })
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
      <TouchableOpacity onPress={() => this.openVideo(item.youtube_url, item.title)}>
        <View style={styles.videoItem}>
          <FastImage source={{uri:item.image_for_youtube}} style={styles.imageItem} resizeMode={FastImage.resizeMode.contain}/>
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
      <TouchableOpacity onPress={() => this.openArticle(item.article_url, item.title)}>
        <View style={styles.videoItem}>
          <FastImage source={{uri:item.image_for_article}} style={styles.imageItem} resizeMode={FastImage.resizeMode.contain}/>
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
      <TouchableOpacity onPress={() => this.openQuestion(index)}>
        <View style={styles.questionItem}>
          <FastImage source={{uri:item.image}} style={styles.imageItem2} resizeMode={FastImage.resizeMode.contain}/>
          <View style={styles.descItem}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          <Image source={Images.rightArrowBlack} style={styles.imgMenu2}/>
        </View>
      </TouchableOpacity>
    )
  }

  onShouldStartLoadWithRequest = (navigator) => {
    if (navigator.url.indexOf('embed') !== -1
    ) {
        return true;
    } else {
        this.videoPlayer.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        return false;
    }
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
            {this.props.cart.data.length > 0 && <View style={styles.notifContainer}>
              <Text style={styles.textNotif}>{this.props.cart.data.length}</Text>
            </View>}
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isShowVideo}
            onRequestClose={() => {
              this.setState({
                isShowVideo:false
              })
            }}>
              <View
                style={styles.containerModal}
                activeOpacity={1}
              >
                <View style={styles.videoWrapper}>
                  <TouchableOpacity style={styles.closeBtn} onPress={() => this.setState({
                    isShowVideo:false
                  })}>
                    <Image source={Images.x} style={styles.closeImage}/>
                  </TouchableOpacity>
                  <Text style={styles.videoTitle}>{this.state.videoTitle}</Text>
                  <View style={styles.videoPlayer}>
                    {this.state.appState === 'active' &&
                    <WebView
                      startInLoadingState={true}
                      renderLoading={() => {
                        return (
                          <ActivityIndicator
                            color={Colors.mooimom}
                            size="large"
                          />
                        )
                      }}
                     ref={(ref) => { this.videoPlayer = ref;}}
                     source={{ html:  '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' + this.state.videoUrl + '?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>'}}
                     onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                     onNavigationStateChange ={this.onShouldStartLoadWithRequest} //for Android
                    />}
                  </View>
                </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isShowArticle}
            onRequestClose={() => {
              this.setState({
                isShowArticle:false
              })
            }}>
              <View
                style={styles.containerModal2}
                activeOpacity={1}
              >
                <View style={styles.headerArticle}>
                <Text style={styles.articleTitle}>{this.state.articleTitle}</Text>
                  <TouchableOpacity style={styles.closeBtn2} onPress={() => this.setState({
                    isShowArticle:false
                  })}>
                    <Image source={Images.x} style={styles.closeImage}/>
                  </TouchableOpacity>
                </View>
                <WebView
                  startInLoadingState={true}
                  renderLoading={() => {
                    return (
                      <ActivityIndicator
                        color={Colors.mooimom}
                        size="large"
                      />
                    )
                  }}
                  source={{ uri:  this.state.articleUrl}}
                />
            </View>
          </Modal>
          {this.state.isShowQASub && <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isShowQASub}
            onRequestClose={() => {
              this.setState({
                isShowQASub:false
              })
            }}>
              <View
                style={styles.containerModal2}
                activeOpacity={1}
              >
                <View style={styles.headerQA}>
                <TouchableOpacity style={styles.closeBtn3} onPress={() => this.setState({
                  isShowQASub:false
                })}>
                  <Image source={Images.back} style={styles.imgHeader}/>
                </TouchableOpacity>
                <Text style={styles.qaTitle}>{this.state.question[this.state.selectedQAIndex].title}</Text>
                </View>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.question[this.state.selectedQAIndex].children}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => this.openQuestionSub(index)}>
                      <View style={styles.questionItem}>
                        <FastImage source={{uri:item.image}} style={styles.imageItem2} resizeMode={FastImage.resizeMode.contain}/>
                        <View style={styles.descItem}>
                          <Text style={styles.titleText}>{item.title}</Text>
                        </View>
                        <Image source={Images.rightArrowBlack} style={styles.imgMenu2}/>
                      </View>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
                />
            </View>
          </Modal>}
          {this.state.isShowQASub2 && <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isShowQASub2}
            onRequestClose={() => {
              this.setState({
                isShowQASub2:false
              })
            }}>
              <View
                style={styles.containerModal2}
                activeOpacity={1}
              >
                <View style={styles.headerQA}>
                <TouchableOpacity style={styles.closeBtn3} onPress={() => this.setState({
                  isShowQASub2:false
                })}>
                  <Image source={Images.back} style={styles.imgHeader}/>
                </TouchableOpacity>
                <Text style={styles.qaTitle}>{this.state.question[this.state.selectedQAIndex].children[this.state.selectedQAIndex2].title}</Text>
                </View>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.question[this.state.selectedQAIndex].children[this.state.selectedQAIndex2].children}
                renderItem={({item, index}) => {
                  return (
                    <Accordion
                      title={item.title}
                      data={item.content}
                    />
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
                />
            </View>
          </Modal>}
          <View style={styles.itemContainer}>
            {this.state.activeMenu === 'video' &&
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.video}
              renderItem={this._renderVideo.bind(this)}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.onEndReached.bind(this)}
              onEndReachedThreshold={5}
            />}
            {this.state.activeMenu === 'article' &&
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.article}
              renderItem={this._renderArticle.bind(this)}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.onEndReachedArticle.bind(this)}
              onEndReachedThreshold={5}
            />}
            {this.state.activeMenu === 'question' &&
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.question}
              renderItem={this._renderQuestion.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />}
            {(this.props.question.fetching || this.props.article.fetching || this.props.video.fetching)
              && !isReloadPage && !isReloadPageArticle
              && <View style={styles.containerLoading2}>
              <ActivityIndicator size="large" color={Colors.mooimom} />
            </View>}
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
    video: state.video,
    cart: state.cart
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
