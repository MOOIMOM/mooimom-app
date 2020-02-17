import React, { Component } from 'react'
import { ScrollView, Platform, SafeAreaView, Text, View, Image, TouchableOpacity, FlatList, Linking, WebView, AppState, Modal } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux'
import GetQuestionActions from '../Redux/GetQuestionRedux'
import GetArticleActions from '../Redux/GetArticleRedux'
import SettingActions from '../Redux/SettingRedux'
import GetVideoActions from '../Redux/GetVideoRedux'
import FastImage from 'react-native-fast-image'
import Accordion from '../Components/Accordion'

import { convertToRupiah, getDateFromString } from '../Lib/utils'
import { DotIndicator } from 'react-native-indicators'

// Styles
import styles from './Styles/LearnScreenStyles'
import menuStyles from './Styles/MenuComponentStyles'

var isReloadPage = false
var isReloadPageArticle = false
class LearnScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => {
      const iconName = (focused ? Images.learn2 : Images.learn)
      return <Image source={iconName} style={menuStyles.menuImage} />
    },
  };
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      isShowVideo: false,
      isShowArticle: false,
      activeMenu: (this.props.navigation.state.params && this.props.navigation.state.params.activeMenu && this.props.navigation.state.params.activeMenu !== '') ? this.props.navigation.state.params.activeMenu : 'video',
      video: [],
      article: [],
      simulations: [],
      question: [
        {
          title: 'Tentang Aplikasi Mooimom',
          desc: '',
          openTable: false,
          openSim: false,
          simDesc: '',
          children: [
            {
              title: 'Apa Itu Mooimom App?',
              desc: 'Aplikasi MOOIMOM adalah platform social commerce sebagai wadah setiap reseller untuk dapat menjalankan bisnis secara online, tanpa harus menyetok atau mengirimkan barang ke pelanggan. Aplikasi MOOIMOM fokus pada semua barang kebutuhan ibu, bayi, maupun anak.',
              openTable: false,
              openSim: false,
              simDesc: '',
              children: []
            }
          ]
        },
        {
          title: 'Tentang Reseller',
          desc: '',
          openTable: false,
          openSim: false,
          simDesc: '',
          children: [
            {
              title: 'Cara Menjadi Reseller',
              desc: 'Isi form pendaftaran Reseller secara lengkap. Anda juga diharuskan mengunggah kartu identitas berupa KTP atau SIM.',
              openTable: false,
              openSim: false,
              simDesc: '',
              children: []
            },
            {
              title: 'Cara Kerja Reseller',
              desc: 'Pada kolom produk, terdapat icon Bagikan untuk beberapa platform. Disana Reseller dapat mulai untuk memasarkan produk kepada saudara, sahabat, teman, ataupun komunitas. Reseller dapat menyalin deskripsi produk dan menambahkan testimonial pribadi untuk meyakinkan calon pembeli. Lakukan order dan selesaikan pembayaran segera.',
              openTable: false,
              openSim: false,
              simDesc: '',
              children: []
            },
            {
              title: 'Keuntungan Menjadi Reseller',
              desc: 'Reseller MOOIMOM akan mendapatkan komisi atas setiap pesanan yang dilakukan melalui aplikasi yang akan langsung masuk ke kolom MOOIMOM CASH. Besarnya komisi tergantung pada jumlah order yang telah dilakukan pada periode tertentu. Berikut adalah perhitungan komisi untuk para reseller.',
              openTable: true,
              openSim: false,
              simDesc: '',
              children: []
            },
          ]
        },
        {
          title: 'Tentang Mooimom Cash',
          desc: '',
          openTable: false,
          openSim: false,
          simDesc: '',
          children: [
            {
              title: 'Menarik Mooimom Cash',
              desc: 'Klik kolom MOOIMOM Cash pada akun Reseller, klik tarik saldo MOOIMOM Cash. Isi form penarikan saldo. Minimal penarikan saldo ialah Rp100.000. MOOIMOM akan mentransfer sejumlah dana dari Rekening MOOIMOM : BCA PT Mestika Persada Makmur. Setiap penarikan, reseller akan dibebankan biaya admin bank sesuai dengan ketentuan bank masing-masing reseller. Simulasi admin bank :',
              openTable: false,
              openSim: true,
              simDesc: 'Reseller ingin menari saldo sejumlah Rp100.000, maka reseller akan menerima transfer sejumlah Rp96.000 ke rekening, jumlah tersebut sudah termasuk potongan biaya admin bank. Penarikan saldo MOOIMOM Cash hanya dapat dilakukan sekali dalam seminggu. Proses penarikan saldo memakan waktu maksimal 7 (tujuh hari) sejak Reseller mengajukan penarikan saldo.',
              children: []
            }
          ]
        },
        {
          title: 'Tentang Mooimom Points',
          desc: '',
          openTable: false,
          openSim: false,
          simDesc: '',
          children: [
            {
              title: 'Mooimom Points',
              desc: 'MOOIMOM Points adalah rewards yang akan Reseller dapatkan atas setiap promosi yang dilakukan di dalam maupun di luar aplikasi. MOOIMOM Points dapat Reseller gunakan untuk membeli produk pada aplikasi MOOIMOM. MOOIMOM Points tidak dapat ditukar dengan uang cash.',
              openTable: false,
              openSim: true,
              simDesc: '',
              children: []
            }
          ]
        },
      ],
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

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    let data = {
      data_request: {
        user_id: this.props.auth.payload.user_id,
        unique_token: this.props.auth.payload.unique_token,
      }
    }
    this.props.getSettingRequest(data)
    this.props.getVideoProcess(data)
    this.props.getArticleProcess(data)
    this.props.getQuestionProcess(data)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.setting !== newProps.setting) {
      if (
        newProps.setting.payload !== null &&
        newProps.setting.error === null &&
        !newProps.setting.fetching
      ) {
        this.setState({
          simulations: newProps.setting.payload.sales_target,
        })
      }
    }
    if (newProps.video !== this.props.video) {
      if (
        newProps.video.payload !== null &&
        newProps.video.error === null &&
        !newProps.video.fetching && !isReloadPage
      ) {
        this.setState({
          video: newProps.video.payload.youtube_videos
        })
      } else if (
        newProps.video.payload !== null &&
        newProps.video.error === null &&
        !newProps.video.fetching && isReloadPage
      ) {
        var arr = [...this.state.video]
        arr = arr.concat(newProps.video.payload.youtube_videos)
        this.setState({
          video_page: this.state.video_page + 1,
          video: arr
        })
        isReloadPage = false
      }
    }

    if (newProps.article !== this.props.article) {
      if (
        newProps.article.payload !== null &&
        newProps.article.error === null &&
        !newProps.article.fetching && !isReloadPageArticle
      ) {
        this.setState({
          article: newProps.article.payload.articles
        })
      } else if (
        newProps.article.payload !== null &&
        newProps.article.error === null &&
        !newProps.article.fetching && isReloadPageArticle
      ) {
        var arr = [...this.state.article]
        arr = arr.concat(newProps.article.payload.articles)
        this.setState({
          article_page: this.state.article_page + 1,
          article: arr
        })
        isReloadPageArticle = false
      }
    }

    if (newProps.navigation.state.params !== this.props.navigation.state.params
      && newProps.navigation.state.params.activeMenu
      && newProps.navigation.state.params.activeMenu !== ''
      && newProps.navigation.state.params.activeMenu !== this.state.activeMenu) {
      this.pressMenu(newProps.navigation.state.params.activeMenu)
    }
  }

  actNavigate(page, obj = {}) {
    const { navigate } = this.props.navigation
    navigate(page, obj)
  }

  onEndReached() {
    if (!isReloadPage) {
      if (this.state.video_page + 1 <= this.props.video.payload.how_many_pages) {
        isReloadPage = true
        let data = {
          data_request: {
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
          }
        }
        this.props.getVideoProcess(data)
      }
    }
  }

  onEndReachedArticle() {
    if (!isReloadPageArticle) {
      if (this.state.article_page + 1 <= this.props.article.payload.how_many_pages) {
        isReloadPageArticle = true
        let data = {
          data_request: {
            user_id: this.props.auth.payload.user_id,
            unique_token: this.props.auth.payload.unique_token,
          }
        }
        this.props.getArticleProcess(data)
      }
    }
  }

  openVideo(url, title) {
    this.setState({
      videoUrl: url,
      videoTitle: title,
      isShowVideo: true,
      activeMenu: 'video'
    })
  }

  openArticle(url, title) {
    this.setState({
      articleUrl: url,
      articleTitle: title,
      isShowArticle: true,
      activeMenu: 'article'
    })
  }

  openQuestion(index) {
    this.setState({
      selectedQAIndex: index,
      isShowQASub: true,
      activeMenu: 'question'
    })
  }

  openQuestionSub(index) {
    this.setState({
      selectedQAIndex2: index,
      isShowQASub2: true
    })
  }

  pressMenu(menu) {
    if (this.state.activeMenu !== menu) {
      this.setState({
        activeMenu: menu,
      })
    }
  }

  isSelected(menu) {
    if (this.state.activeMenu === menu) {
      return { backgroundColor: Colors.mooimom }
    }
  }

  isSelectedText(menu) {
    if (this.state.activeMenu === menu) {
      return { color: Colors.white }
    }
  }

  _renderVideo({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.openVideo(item.youtube_url, item.title)}>
        <View style={styles.videoItem}>
          <FastImage source={{ uri: item.image_for_youtube }} style={styles.imageItem} resizeMode={FastImage.resizeMode.contain} />
          <View style={styles.descItem}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.titleText2}>durasi: {item.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderArticle({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.openArticle(item.article_url, item.title)}>
        <View style={styles.videoItem}>
          <FastImage source={{ uri: item.image_for_article }} style={styles.imageItem} resizeMode={FastImage.resizeMode.contain} />
          <View style={styles.descItem}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.titleText2}>waktu baca: {item.read_time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderQuestion({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.openQuestion(index)}>
        <View style={styles.questionItem}>
          <View style={styles.descItem}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
        </View>
      </TouchableOpacity>
    )
  }

  _renderSimulation() {
    if (this.state.simulations.length > 0)
      return (
        this.state.simulations.map((item, index) => {
          return (
            <View style={styles.itemSimulation} key={index.toString()}>
              <Text style={styles.textSimulation}>{item.name}</Text>
              <Text style={styles.textSimulation}>{convertToRupiah(item.minimal)}</Text>
              <Text style={styles.textSimulation2}>{item.commission}%</Text>
            </View>
          )
        })
      )
  }

  onShouldStartLoadWithRequest = (navigator) => {
    if (navigator.url.indexOf('embed') !== -1
    ) {
      return true;
    } else {
      this.videoPlayer.stopLoading();
      return false;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.searchButton} onPress={() => this.actNavigate('SearchScreen')}>
            <Image source={Images.search} style={styles.imageSearch} />
            <Text style={styles.textSearch}>Cari Baju Hamil, Bra, Korset, dll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHeader} onPress={() => this.actNavigate('CartScreen')}>
            <Image source={Images.shoppingCartBlack} style={styles.imgHeader} />
            {this.props.cart.data.length > 0 && <View style={styles.notifContainer}>
              <Text style={styles.textNotif}>{this.props.cart.data.length}</Text>
            </View>}
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperSeparator} />
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
                isShowVideo: false,
                videoUrl: '',
              })
            }}>
            <View
              style={styles.containerModal}
              activeOpacity={1}
            >
              <View style={styles.videoWrapper}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => this.setState({
                  isShowVideo: false,
                  videoUrl: '',
                })}>
                  <Image source={Images.x} style={styles.closeImage} />
                </TouchableOpacity>
                <Text style={styles.videoTitle}>{this.state.videoTitle}</Text>
                <View style={styles.videoPlayer}>
                  {Platform.OS === 'ios' && <WebView
                    mediaPlaybackRequiresUserAction={true}
                    renderLoading={() => {
                      return (
                        <DotIndicator
                          color={Colors.mooimom}
                          size={12}
                        />
                      )
                    }}
                    ref={(ref) => { this.videoPlayer = ref; }}
                    source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' + this.state.videoUrl + '?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>' }}
                  />}
                  {Platform.OS === 'android' && this.state.appState === 'active' && <WebView
                    startInLoadingState={true}
                    renderLoading={() => {
                      return (
                        <DotIndicator
                          color={Colors.mooimom}
                          size={12}
                        />
                      )
                    }}
                    ref={(ref) => { this.videoPlayer = ref; }}
                    source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' + this.state.videoUrl + '?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>' }}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                    onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
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
                isShowArticle: false
              })
            }}>
            <SafeAreaView
              style={styles.containerModal2}
              activeOpacity={1}
            >
              <View style={styles.headerArticle}>
                <Text style={styles.articleTitle}>{this.state.articleTitle}</Text>
                <TouchableOpacity style={styles.closeBtn2} onPress={() => this.setState({
                  isShowArticle: false
                })}>
                  <Image source={Images.x} style={styles.closeImage} />
                </TouchableOpacity>
              </View>
              <WebView
                startInLoadingState={true}
                renderLoading={() => {
                  return (
                    <DotIndicator
                      color={Colors.mooimom}
                      size={12}
                    />
                  )
                }}
                source={{ uri: this.state.articleUrl }}
              />
            </SafeAreaView>
          </Modal>
          {this.state.isShowQASub && <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isShowQASub && (Platform.OS === 'ios' ? !this.state.isShowQASub2 : true)}
            onRequestClose={() => {
              this.setState({
                isShowQASub: false
              })
            }}>
            <SafeAreaView
              style={styles.containerModal2}
              activeOpacity={1}
            >
              <View style={styles.headerQA}>
                <TouchableOpacity style={styles.closeBtn3} onPress={() => this.setState({
                  isShowQASub: false
                })}>
                  <Image source={Images.back} style={styles.imgHeader} />
                </TouchableOpacity>
                <Text style={styles.qaTitle}>{this.state.question[this.state.selectedQAIndex].title}</Text>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.question[this.state.selectedQAIndex].children}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => this.openQuestionSub(index)}>
                      <View style={styles.questionItem}>
                        <View style={styles.descItem}>
                          <Text style={styles.titleText}>{item.title}</Text>
                        </View>
                        <Image source={Images.rightArrowBlack} style={styles.imgMenu2} />
                      </View>
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </SafeAreaView>
          </Modal>}
          {this.state.isShowQASub2 && <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isShowQASub2}
            onRequestClose={() => {
              this.setState({
                isShowQASub2: false
              })
            }}>
            <SafeAreaView
              style={styles.containerModal2}
              activeOpacity={1}
            >
              <View style={styles.headerQA}>
                <TouchableOpacity style={styles.closeBtn3} onPress={() => this.setState({
                  isShowQASub2: false
                })}>
                  <Image source={Images.back} style={styles.imgHeader} />
                </TouchableOpacity>
                <Text style={styles.qaTitle}>{this.state.question[this.state.selectedQAIndex].children[this.state.selectedQAIndex2].title}</Text>
              </View>
              <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1 }}>{this.state.question[this.state.selectedQAIndex].children[this.state.selectedQAIndex2].desc}</Text>
                {this.state.question[this.state.selectedQAIndex].children[this.state.selectedQAIndex2].openTable &&
                  <View style={styles.tableSimulation}>
                    <View style={styles.tablesimulationHeader}>
                      <Text style={styles.tableHeaderText}>Target Penjualan</Text>
                      <Text style={styles.tableHeaderText}>Min. Pesanan</Text>
                      <Text style={styles.tableHeaderText2}>Bonus</Text>
                    </View>
                    {this._renderSimulation()}
                  </View>
                }
                {this.state.question[this.state.selectedQAIndex].children[this.state.selectedQAIndex2].openSim &&
                  <Text style={{ fontFamily: Fonts.type.gotham2, color: Colors.black, fontSize: Metrics.fontSize1, marginTop: 10 }}>{this.state.question[this.state.selectedQAIndex].children[this.state.selectedQAIndex2].simDesc}</Text>}
              </View>
            </SafeAreaView>
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
                <DotIndicator size={12} color={Colors.mooimom} />
              </View>}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    question: state.question,
    article: state.article,
    video: state.video,
    cart: state.cart,
    setting: state.setting
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
    getSettingRequest: data => {
      dispatch(SettingActions.getSettingRequest(data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnScreen)
