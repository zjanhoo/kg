const app = getApp()
const myutils = require('../../libraries/myutils.js')
Page({
  data:{
    autoplay:true,
    pictures:["../../images/login.png","../../images/login.png","../../images/login.png"]
  },
  onLoad:function(options){
    var that = this
     wx.getSystemInfo({
        success: function(res) {
          that.setData({height:res.windowHeight})
        }
      })
    myutils.loadSongs(8,0)
      .then(d => {
        if (d) {
            var json = myutils.evalJsonp(d)
            if(json&&json.data){
               var songs = json.data.feeds
                var stars = json.data.userlist
                wx.setStorage({
                  key:"stars",
                  data:stars
                })
                //console.log(songs);
                for(var i=0;i<songs.length;i++){
                  songs[i].nick = myutils.emFilter(songs[i].nick)
                }
                wx.setStorage({
                  key:"songs",
                  data:songs
                })
            }
        }
      }).catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
     })
  },
  start:function() {
    wx.redirectTo({ url: '../hot/list' })
  },
  change:function(e){
    if(e.detail.current&&e.detail.current==2){
      this.setData({autoplay:false});
    }
  }
})