import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  PermissionsAndroid,
  Alert,
  AsyncStorage
} from 'react-native'
import {isAfter, max, format} from 'date-fns'

export function convertToRupiah (price) {
  if(!price) return 'Rp 0'
  var rupiah = ''
  var price = price
    .toString()
    .split('')
    .reverse()
    .join('')
  for (var i = 0; i < price.length; i++) {
    if (i % 3 === 0) rupiah += price.substr(i, 3) + '.'
  }
  return (
    'Rp' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  )
}

const PictureDir = RNFetchBlob.fs.dirs.PictureDir + '/Mooimom/';
const base64Text = 'data:image/png;base64,';

export async function downloadFile(url, filename){
  var resp = await RNFetchBlob.fetch('GET', url)
  let base64image = resp.data;
  let imageLocation = PictureDir+filename;
  RNFetchBlob.fs.writeFile(imageLocation, base64image, 'base64');
  RNFetchBlob.fs.scanFile([ { path : imageLocation, mime : 'multipart/mixed' } ])
   .then(() => {
   })
   .catch((err) => {
   })
   return base64Text + base64image
}

export function shareDescripton(description, social = ''){
  if (!description || description === '') description = 'Empty Description'
  var shareOptions = {
    message: description,
  };
  if(social !== ''){
    switch(social){
      case 'whatsapp':
        shareOptions.social = Share.Social.WHATSAPP
        break
      case 'instagram':
        shareOptions.social = Share.Social.INSTAGRAM
        break
      case 'facebook':
        shareOptions.social = Share.Social.FACEBOOK
        break
    }
    Share.shareSingle(shareOptions)
      .then(result => {})
      .catch((e) => {
        Share.open(shareOptions).then(result => {}).catch((e) => {})
      })
  } else {
    Share.open(shareOptions).then((resp) => {}).catch((e) => {})
  }
}

export async function download(images){
  var files = []
  var urls = []
  images.map((image) => {
    var file = {}
    file.url = image.url
    file.name = image.url.substring(image.url.lastIndexOf('/')+1);
    files.push(file)
  })

  var allowedStorage = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  )
  if (allowedStorage === 'granted') {
    let check = checkFolder()
    await check
    for(var i = 0; i< files.length;i++){
      urls.push(getFileToShare(files[i]))
    }
    return await Promise.all(urls)
  } else {
    Alert.alert('Please allow permission to download the images')
    return false
  }
}

export async function share(images, social = '') {
  var files = []
  var urls = []
  if(!images) return null
  images.map((image) => {
    var file = {}
    file.url = image.url
    file.name = image.url.substring(image.url.lastIndexOf('/')+1);
    files.push(file)
  })

  var allowedStorage = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  )
  if (allowedStorage === 'granted') {
    let check = checkFolder()
    await check
    for(var i = 0; i< files.length;i++){
      urls.push(getFileToShare(files[i]))
    }
    Promise.all(urls)
    .then((results) => {
      var shareOptions = {
        urls: results,
      };
      if(social !== ''){
        switch(social){
          case 'whatsapp':
            shareOptions.social = Share.Social.WHATSAPP
            break
          case 'instagram':
            shareOptions.social = Share.Social.INSTAGRAM
            shareOptions.urls = undefined
            shareOptions.url = results[0]
            break
          case 'facebook':
            shareOptions.social = Share.Social.FACEBOOK
            break
        }
        Share.shareSingle(shareOptions)
          .then(result => {})
          .catch((e) => {
            Share.open(shareOptions).then(result => {}).catch((e) => {})
          })
      } else {
        Share.open(shareOptions).then((resp) => {}).catch((e) => {})
      }
    })
    .catch((e) => {
        // Handle errors here
        return null
    });
  } else {
    Alert.alert('Please allow permission to share the product')
    return null
  }
}

async function checkFolder(){
  let exists = await RNFetchBlob.fs.exists(PictureDir);
  if (!exists) {
    RNFetchBlob.fs.mkdir(PictureDir).then(() => {
    }).catch((e) => { Alert.alert("Directory Creating Error : " + e.message); });
  }
}

async function getFileToShare(file){
  //Check if Images is exist in folder
  let exist = await RNFetchBlob.fs.exists(PictureDir + file.name)
  if(exist){
    let data = await RNFetchBlob.fs.readFile(PictureDir + file.name, 'base64')
    return base64Text + data
  } else {
    let data = await downloadFile(file.url, file.name)
    return data
  }
}

export function getDateFromString(str, full = true, fullMonth = false, useTime = false, useSecond = false){
  var res = ''
  if(!str || (str.length !== 10 && str.length !== 19 && str.length !== 16)) return res
  const months = [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
       "Jul", "Agu", "Sep", "Okt", "Nov", "Des" ];
  const fullmonths = [ "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember" ];
  let idx = parseInt(str[6] + str[7]) - 1
  if(idx < 0) return res
  //day
  res = parseInt(str[8] + str[9]).toString()
  //month
  res = res + ' ' + (fullMonth ? fullmonths[idx] : months[idx])
  if(!full)
    return res
  //year
  res = res + ' ' + str.substring(0,4)
  if(!useTime)
    return res
  //hh:mm:ss
  res = res + ' ' + str.substr(11, 5)
  if(!useSecond)
    return res
  res = res + ' ' + str.substr(17, 2)
  return res
}

export function titleCase(str) {
   if(!str) return ''
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   // Directly return the joined string
   return splitStr.join(' ');
}

export function getNewNotificationsCount(notifications, time) {
  const times = notifications
    .map(notification => notification.created)
    .filter(notificationTime => isAfter(notificationTime, time))
  // console.log('aaaa', times.length)
  return times.length
}
