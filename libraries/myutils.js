/**
 * 获取热门作品推荐及k歌明星列表
 */
const LOADSONGS="http://cgi.kg.qq.com/fcgi-bin/fcg_homepage_feed";

/**
 * 获取歌曲详情
 */
const SONGDETAIL="http://cgi.kg.qq.com/fcgi-bin/kg_ugc_getdetail";

/**
 * 获取K歌明星的专辑，作品，粉丝等信息
 */
const STARHOMEPAGE="http://cgi.kg.qq.com/fcgi-bin/kg_ugc_get_homepage";

/**
 * 由于不支持eval()方法只好如此处理
 * 
 */
function evalJsonp(data){
  var json = JSON.parse(data.substring(data.indexOf("(")+1,data.lastIndexOf(")")))
  return json;
}
/**
 * 过滤昵称中的emoji
 */
function emFilter(nick){
  var arr = nick.split("[em]");
  if(arr&&arr.length>0){
    for(var i=0;i<arr.length;i++){
     if(nick.indexOf("[em]")>-1){
      nick =  nick.replace(nick.substring(nick.indexOf("[em]"),nick.indexOf("[/em]")+5),"");
     }
    }
  }
  return nick;
}
/**
 * 获取热门作品推荐及k歌明星列表
 */
function loadSongs(params){
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${LOADSONGS}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    })
  })
}
/**
 * 剩余的两个接口等你来实现喽...么么哒 
 */

module.exports = {
  evalJsonp: evalJsonp,
  emFilter:emFilter,
  LOADSONGS:LOADSONGS,
  SONGDETAIL:SONGDETAIL,
  STARHOMEPAGE:STARHOMEPAGE,
  loadSongs (page = 1, index = 8) {
    const params = { page: page, index: index }
    return loadSongs(params)
      .then(res => res.data)
  }
}