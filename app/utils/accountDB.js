import React,{Component} from 'react';  
import{  
  ToastAndroid, 
  View,
} from 'react-native';  
import SQLiteStorage from 'react-native-sqlite-storage';  
SQLiteStorage.DEBUG(true);  
var database_name = "test.db";//数据库文件  
var database_version = "1.0";//版本号  
var database_displayname = "MySQLite";  
var database_size = -1;//-1应该是表示无限制  
var db;  

export default class  UserSQLite extends Component{  
    componentWillUnmount(){  
    if(db){  
        // this._successCB('close');  
        db.close();  
    }else {  
        // console.log("SQLiteStorage not open");  
    }  
  }  
  open(){  
    db = SQLiteStorage.openDatabase(  
      database_name,  
      database_version,  
      database_displayname,  
      database_size,  
      ()=>{  
          this._successCB('open');  
      },  
      (err)=>{  
          this._errorCB('open',err);  
      });  
    return db;  
  }  
  createTable(){  
    if (!db) {  
        this.open();  
    }  
    //创建用户表  
    db.transaction((tx)=> {  
      tx.executeSql('CREATE TABLE IF NOT EXISTS ACCOUNT(' +  
          'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +  
          'account_name VARCHAR,'+  
          'mnemonic VARCHAR,'+
          'is_selected INTEGER,' + 
          'assets_total VARCHAR,' + 
          'backup_status INTEGER,' +    
          'address VARCHAR,' + 
          'kid VARCHAR,' + 
          'version INTEGER,' + 
          'cipher VARCHAR,' + 
          'ciphertext VARCHAR,' + 
          'kdf VARCHAR,' + 
          'mac VARCHAR,' + 
          'dklen INTEGER,' + 
          'salt VARCHAR,' + 
          'n INTEGER,' + 
          'r INTEGER,' + 
          'p INTEGER,' + 
          'iv VARCHAR)'  
          , [], ()=> {  
              this._successCB('executeSql');  
          }, (err)=> {  
              this._errorCB('executeSql', err);  
        });  
    }, (err)=> {
        // this._errorCB('transaction', err);  
    }, ()=> {  
        // this._successCB('transaction');  
    })  
    }  
  deleteData(){  
    if (!db) {  
        this.open();  
    }  
    db.transaction((tx)=>{  
      tx.executeSql('delete from account',[],()=>{  
  
      });  
    });  
  }  
  dropTable(){  
    if (!db) {  
        this.open();  
    }  
    db.transaction((tx)=>{  
      tx.executeSql('drop table account',[],()=>{  
  
      });  
    },(err)=>{  
      // this._errorCB('transaction', err);  
    },()=>{  
      // this._successCB('transaction');  
    });  
  }  
  insertUserData(userData){  

    let len = userData.length;  
    if (!db) {  
        this.open();  
    }  
    console.log('插入的data',userData)
    // this.createTable();  
    // this.deleteData();  
    db.transaction((tx)=>{  
       for(let i=0; i<len; i++){  
        var user = userData[i];  
        let account_name= user.account_name;  
        let mnemonic = user.mnemonic;
        let is_selected = user.is_selected;
        let assets_total = user.assets_total;
        let backup_status= user.backup_status;  
        let address= user.address;  
        let kid= user.kid;  
        let version= user.version;  
        let cipher= user.cipher;  
        let ciphertext= user.ciphertext;  
        let kdf= user.kdf;  
        let mac= user.mac;  
        let dklen= user.dklen;  
        let salt= user.salt;  
        let n= user.n;  
        let r= user.r;  
        let p= user.p;  
        let iv= user.iv;  

        let sql = "INSERT INTO account(account_name,mnemonic,is_selected,assets_total,backup_status,address,kid,version,cipher,ciphertext,kdf,mac,dklen,salt,n,r,p,iv)"+  
        "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";  
        tx.executeSql(sql,[account_name,mnemonic,is_selected,assets_total,backup_status,address,kid,version,cipher,ciphertext,kdf,mac,dklen,salt,n,r,p,iv],()=>{  
            
          },(err)=>{  
            console.log(err);  
          }  
        );  
      }  
    },(error)=>{  
      // this._errorCB('transaction', error);  
      // console.log('数据插入失败')
      this.successInsertData(false)
    },()=>{  
      // this._successCB('transaction insert data'); 
      console.log("成功插入 "+len+" 条用户数据")
      this.successInsertData(true)
    });  
  }  
  close(){  
      if(db){  
          this._successCB('close');  
          db.close();  
      }else {  
          // console.log("SQLiteStorage not open");  
      }  
      db = null;  
  }
  async successInsertData(status){
    let s = await status
    return s
  }  
  _successCB(name){  
    // console.log("SQLiteStorage "+name+" success");  
  }  

  _errorCB(name, err){  
    // console.log("SQLiteStorage "+name);  
    // console.log(err);  
  }  
    render(){  
        return null
    }  
}

