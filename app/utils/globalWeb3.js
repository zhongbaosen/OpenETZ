
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
const Web3 = require('web3')
const storage = new Storage({
  // 最大容量, 默认为 1000
  size: 10000,

  // 存储引擎, react-native => AsyncStorage, web => localStorage
  storageBackend: AsyncStorage,
    
  // 过期时间(单位 ms), 若为 null 则不过期
  defaultExpires: null,
    
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
    
  // 如果 storage 中没有相应数据, 或数据已过期, 返回 sync 的返回值
  // sync: 
})  


const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.etherzero.org:443"))
global.web3 = web3
global.localStorage = storage
