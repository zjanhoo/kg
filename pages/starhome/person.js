const app = getApp()
const myutils = require('../../libraries/myutils.js')
Page({
  data: {
    title: '',
    loading:false,
    hasMore:false,
    start:1,
    num:8,
    menuStatic:0,
    menu:['作品','专辑','粉丝','关注'],
    ugclist:[]
  },
  onLoad:function(params) {
    var that = this
    wx.request({
      url: myutils.STARHOMEPAGE,
      data: {
        type:'get_uinfo',
        start: this.data.start,
        num:this.data.num,
        share_uid:params.uid
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var json = myutils.evalJsonp(res.data)
        if(json&&json.data&&json.data.ugclist){
          that.setData({ugclist:json.data.ugclist,loading:false,hasMore:json.data.ugclist.length>8})
        }
      }
    })
  },
  loadMore:function(){
    console.log("loadMore....");
    var that = this
    wx.request({
      url: myutils.STARHOMEPAGE,
      data: {
        type:'get_uinfo',
        start:++this.data.start,
        num:this.data.num,
        share_uid:params.uid
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var json = myutils.evalJsonp(res.data)
        if(json&&json.data&&json.data.ugclist){
          that.setData({ugclist:json.data.ugclist,loading:false,hasMore:json.data.ugclist.length>0})
        }
      }
    })
  },
  click_menu:function(e){
    this.setData({menuStatic:e.currentTarget.id});
  }
})
