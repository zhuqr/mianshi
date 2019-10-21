import
CryptoJS
from 'crypto-js'

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 * @param word
 * @returns {*}
 */
export function encrypt(word) {
  var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * 解密
 * @param word
 * @returns {*}
 */
export function decrypt(word) {
  var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}