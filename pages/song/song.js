const app = getApp()
const myutils = require('../../libraries/myutils.js')
Page({
  data: {
    title: '',
    loading: true,
    position:0,
    song: {}
  },
  onLoad:function (params) {
    var shareId = params.shareId;
    var that = this 
    if(shareId){
      wx.request({
        url: myutils.SONGDETAIL,
        data: {
          shareid:shareId,
          v: 4,
          callback:'jsopgetsonginfo'
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
           console.log("success-------");
          var json = myutils.evalJsonp(res.data)
          var song = json.data
          console.log(song);
          song.nick = myutils.emFilter(song.nick)
          that.setData({
            song:song,
            loading: false,
            subtitle:song.song_name,
            action: {
              method: 'pause'
            }
          })
        }
      })
    }
  },
   audioPlay: function () {
     if(this.data.action&&this.data.action.method=='play'){
        this.setData({
          action: {
            method: 'pause'
          }
       })
    }else{
        this.setData({
          action: {
            method: 'play'
          }
       })
    }
  },
  onUnload:function(){
    /*后台播放*/
    /*
    if(this.data.action&&this.data.action.method=='play'){
      wx.pauseBackgroundAudio()
      wx.playBackgroundAudio({
          dataUrl: this.data.song.playurl,
          title: this.data.song.song_name,
          coverImgUrl: this.data.song.cover
      })
      wx.seekBackgroundAudio({
          position: this.data.position
      })
    }else{
      // wx.pauseBackgroundAudio()
    }*/
  },
  timeupdate:function(e){
    this.setData({position:e.detail.currentTime})
  }
})