const app = getApp()
const myutils = require('../../libraries/myutils.js')
Page({
  data: {
    index:0,
    page:8,
    subtitle: '加载中...',
    loading: true,
    hasMore: true,
    stars:[]
  },
  onLoad:function() {
    var that = this
    wx.getStorage({
      key: 'stars',
      success: function(res) {
          console.log(res.data)
          that.setData({stars:res.data,loading: false,subtitle:"K歌明星"})
      }
    })
  },
  loadMore:function(){
    console.log("aaaa");
    this.setData({loading: false,subtitle:"K歌明星"})
  }
})