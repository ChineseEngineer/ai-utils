const ua = navigator.userAgent
const CHANNEL = 'channel'
const TOKEN = 'token'

const storage = {
  get (name) {
    const val = sessionStorage.getItem(name) || localStorage.getItem(name)
    return val ? JSON.parse(val) : val
  },
  set (name, val) {
    const value = JSON.stringify(val)
    sessionStorage.setItem(name, value)
    localStorage.setItem(name, value)
  },
}

/**
 * 获取地址栏参数
 * @param name
 * @returns {string}
 */
export const getQueryStringByName = (name) => {
  var result = document.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

/**
 * 获取用户token
 * @returns {string}
 */
export const getToken = () => {
  let token = getQueryStringByName(TOKEN) || storage.get(TOKEN)
  if (isApp() && ua.indexOf('token:') !== -1) {
    if (ua.indexOf('deviceId:') !== -1) {
      token = ua.substring(ua.indexOf('token:') + 6).split('/deviceId:')[0]
    } else {
      token = ua.substring(ua.indexOf('token:') + 6)
    }
  }
  setToken(token)
  return token
}

/**
 * 设置token值
 * @param {string} val token
 */
export const setToken = (val) => {
  storage.set(val)
}

/**
 * 清除token
 */
export const clearToken = () => {
  storage.set(TOKEN, null)
}

/**
 * 获取channel
 * @returns {string}
 */
export const getChannel = () => {
  const channel = getQueryStringByName(CHANNEL) || storage.get(CHANNEL)
  storage.set(channel)
  return channel
}

/**
 * 设置channel
 * @param {string} val channel
 */
export const setChannel = (val) => {
  storage.set(val)
}

/**
 * 车主惠APP环境
 * @returns {boolean}
 */
export const isApp = () => {
  return ua.indexOf('/Optimus') !== -1
}

/**
 * 微信公众号环境
 * @returns {boolean}
 */
export const isWechat = () => {
  return !/miniProgram/i.test(ua) && /micromessenger/i.test(ua)
}

/**
 * 微信小程序环境
 * @returns {boolean}
 */
export const isMPWechat = () => {
  return /miniProgram/i.test(ua) && /micromessenger/i.test(ua)
}

/**
 * 支付宝小程序环境
 * @returns {boolean}
 */
export const isMPAlipayClient = () => {
  return ua.indexOf('AlipayClient') !== -1
}

export const isMiniProgram = () => {
  return [isMPWechat, isMPAlipayClient].some(item => item())
}

module.exports =  {
  getToken,
  getChannel,
  isWechat,
  isMPAlipayClient,
  isMiniProgram,
  isApp,
}
