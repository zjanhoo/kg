var app = getApp();
Page({
  data:{
    userInfo: {
      avatarUrl:"http://wx.qlogo.cn/mmhead/0pygn8iaZdEchCcg7RsyibgyNXZNjeEaDp2zCmN3aasIia012ibzc6COGg/132",
      nickName:"文哥"
    },
    y_menus:[
      {title:'好友动态',url:""},
      {title:'本地作品',url:""},
      {title:'我要点歌',url:""},
    ],
    x_menus:[
      {title:'收藏',icon:'/images/collection.png'},
      {title:'夜间',icon:'/images/eve.png',classes:'two_side'},
      {title:'设置',icon:'/images/set.png'},
    ],
    toast:{
      display:true,
      msg:""
    }
  },
  redirect:function(e){
    if(e.currentTarget.dataset.url){
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }else{
      this.setData({toast:{display:false,msg:"待完善"}})
    }
  },
  toastChange:function(){
     this.setData({toast:{display:true,msg:""}})
  },
  bingo:function(){
    this.setData({toast:{display:false,msg:"Hi,I'm Aven"}})
  }
})