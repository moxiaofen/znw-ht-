/**
 * Created by ying on 2018/8/20.
 */


const PREFIX_CACHE = 'znw_credit:';//缓存前缀

export default {

  set (key, value) {
    localStorage.setItem(PREFIX_CACHE + key,JSON.stringify(value));
  },
  fetch (key) {
    let data = localStorage.getItem(PREFIX_CACHE + key);
    let dataObj = JSON.parse(data);
    //console.log("data="+dataObj);
    return dataObj;
  }
}

