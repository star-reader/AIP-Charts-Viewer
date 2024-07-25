import CryptoJS from 'crypto-js'
import config from '@/config/key.js'

const key = CryptoJS.enc.Utf8.parse(config.key)
const iv = CryptoJS.enc.Utf8.parse(config.iv)

/**AES解密数据 */
function dataDecrypt(word: any) {
    let decrypt = CryptoJS.AES.decrypt(word, key, { iv , mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

export {dataDecrypt}