import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  PermissionsAndroid,
  Alert
} from 'react-native'

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
