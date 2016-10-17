const app = getApp()
const myutils = require('../../libraries/myutils.js')
Page({
  data: {
    index:0,
    page:8,
    subtitle: '加载中...',
    loading: true,
    hasMore: true,
    songs:[]
  },
  onLoad:function() {
    var that = this
    wx.getStorage({
      key: 'songs',
      success: function(res) {
          that.setData({songs:res.data,loading:false,subtitle:"热门歌曲"})
      }
    })
  },
  loadMore:function(){
    console.log("loding.....more");
     var that = this
     var index = this.data.index+this.data.page
     myutils.loadSongs(8,index)
      .then(d => {
        if (d) {
            var json = myutils.evalJsonp(d)
            if(json&&json.data){
               var songs = json.data.feeds
                for(var i=0;i<songs.length;i++){
                  songs[i].nick = myutils.emFilter(songs[i].nick)
                }
                that.setData({index:index,songs:that.data.songs.concat(songs),loading:false,subtitle:"热门歌曲"})
                wx.setStorage({
                  key:"songs",
                  data:that.data.songs
                })
            }
        }
      }).catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
     })
  }
})