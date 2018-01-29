/**
 * Created by admin on 2018/1/25.
 */
/***
 * 获取浏览器缓存
 * @param key
 * @param cacheType
 * @param dataType
 * @returns string
 */
export function getCache(key, cacheType = 'l', dataType = 'json') {
  let _position = cacheType === 's' ? 'sessionStorage' : 'localStorage';
  let _data = window[_position].getItem(key);
  if (dataType === 'json' && _data) {
    // 存在字符串null的情况
    return _data === 'null' ? null : JSON.parse(_data);
  }
  return _data;
}

/***
 * 设置浏览器缓存 setCache('syj2-xx',{},'s' or 'l' or undefined)
 * @param key
 * @param data
 * @param cacheType
 */
export function setCache(key, data, cacheType = 'l') {
  let _position = cacheType === 's' ? 'sessionStorage' : 'localStorage';
  // 浏览器不支持
  if (window[_position]) {
    try {
      // IOS-5手机浏览器支持cache，但是奇葩的是储存容量为几kb，可能发生错误
      window[_position].setItem(key, typeof data === 'object' ? JSON.stringify(data) : data);
    } catch (e) {
      console.error('缓存数据时发生错误：', e);
    }
  } else {
    console.error(`您的浏览器不支持${_position}`);
  }
}

/***
 * 清除缓存根据key
 * @param key
 * @param data
 * @param cacheType
 */
export function clearCache(key, cacheType = 'l') {
  let _position = cacheType === 's' ? 'sessionStorage' : 'localStorage';
  window[_position].removeItem(key);
}

export function title (title) {
  title = title || '嘉科';
  window.document.title = title;
};
