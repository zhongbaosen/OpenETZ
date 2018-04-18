import React,{Component} from 'react';  
import SQLiteStorage from 'react-native-sqlite-storage';  
SQLiteStorage.DEBUG(true);  
var database_name = "trading.db";//数据库文件  
var database_version = "1.0";//版本号  
var database_displayname = "MySQLite";  
var database_size = -1;//-1应该是表示无限制  
var db;  
export default class  TradingSQLite extends Component{  
    componentWillUnmount(){  
    if(db){  
        this._successCB('close');  
        db.close();  
    }else {  
        console.log("SQLiteStorage not open");  
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
    db.transaction((tx)=> {  
      tx.executeSql('CREATE TABLE IF NOT EXISTS TRADING(' +  
          'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +  
          'tx_token VARCHAR,'+
          'tx_time VARCHAR,'+  
          'tx_result INTEGER,' + 
          'tx_hash VARCHAR,' + 
          'tx_value VARCHAR,' +    
          'tx_sender VARCHAR,' + 
          'tx_receiver VARCHAR,' + 
          'tx_note VARCHAR,' + 
          'tx_account_name VARCHAR,' + 
          'tx_block_number INTEGER)'  
          , [], ()=> {  
              this._successCB('executeSql');  
          }, (err)=> {  
              this._errorCB('executeSql', err);  
        });  
    }, (err)=> {
        this._errorCB('transaction', err);  
    }, ()=> {  
        this._successCB('transaction');  
    })  
    }  
  deleteData(){  
    if (!db) {  
        this.open();  
    }  
    db.transaction((tx)=>{  
      tx.executeSql('delete from trading',[],()=>{  
  
      });  
    });  
  }  
  dropTable(){  
    db.transaction((tx)=>{  
      tx.executeSql('drop table trading',[],()=>{  
  
      });  
    },(err)=>{  
      this._errorCB('transaction', err);  
    },()=>{  
      this._successCB('transaction');  
    });  
  }  
  insertTradingData(insertData){  

    let len = insertData.length;  
    if (!db) {  
        this.open();  
    }  
    console.log('插入的data',insertData)
    // this.createTable();  
    // this.deleteData();  
    db.transaction((tx)=>{  
       for(let i=0; i<len; i++){  
        var tradingTable = insertData[i];  
        let tx_time= tradingTable.tx_time;  
        let tx_token = tradingTable.tx_token;
        let tx_result = tradingTable.tx_result;
        let tx_hash = tradingTable.tx_hash;
        let tx_value= tradingTable.tx_value;  
        let tx_sender= tradingTable.tx_sender;  
        let tx_receiver= tradingTable.tx_receiver;  
        let tx_note= tradingTable.tx_note;  
        let tx_block_number= tradingTable.tx_block_number;  
        let tx_account_name= tradingTable.tx_account_name;  

        let sql = "INSERT INTO trading(tx_time,tx_token,tx_account_name,tx_result,tx_hash,tx_value,tx_sender,tx_receiver,tx_note,tx_block_number)"+  
        "values(?,?,?,?,?,?,?,?,?,?)";  
        tx.executeSql(sql,[tx_time,tx_token,tx_account_name,tx_result,tx_hash,tx_value,tx_sender,tx_receiver,tx_note,tx_block_number],()=>{  
            
          },(err)=>{  
            console.log(err);  
          }  
        );  
      }  
    },(error)=>{  
      this._errorCB('transaction', error);  
      console.log('数据插入失败')
    },()=>{  
      this._successCB('transaction insert data');  
      console.log("成功插入 "+len+" 条用户数据")
    });  
  }  
  close(){  
      if(db){  
          this._successCB('close');  
          db.close();  
      }else {  
          console.log("SQLiteStorage not open");  
      }  
      db = null;  
  }  
  _successCB(name){  
    console.log("SQLiteStorage "+name+" success");  
  }  
  _errorCB(name, err){  
    console.log("SQLiteStorage "+name);  
    console.log(err);  
  }  
    render(){  
        return null;  
    }  
};  