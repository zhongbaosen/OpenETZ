import React,{Component} from 'react'
import SQLiteStorage from 'react-native-sqlite-storage' 
SQLiteStorage.DEBUG(true);  
var database_name = "token.db"  
var database_version = "1.0"  
var database_displayname = "TokenSQLite"  
var database_size = -1  
var db 
export default class  TokenSQLite extends Component{  
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
          // this._successCB('open');  
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
      tx.executeSql('CREATE TABLE IF NOT EXISTS TOKEN(' +  
          'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +  
          'tk_address VARCHAR,'+
          'tk_decimals INTEGER,'+  
          'tk_name VARCHAR,' + 
          'tk_price VARCHAR,' + 
          'tk_symbol VARCHAR,' +    
          'tk_selected INTEGER,' + 
          'tk_number INTEGER)'  
          , [], ()=> {  
              // this._successCB('executeSql');  
          }, (err)=> {  
              this._errorCB('executeSql', err);  
        });  
    }, (err)=> {
        this._errorCB('transaction', err);  
    }, ()=> {  
        // this._successCB('transaction');  
    })  
    }  
  deleteData(){  
    if (!db) {  
        this.open() 
    }  
    db.transaction((tx)=>{  
      tx.executeSql('delete from token',[],()=>{  

      })  
    }) 
  }  
  dropTable(){  
    db.transaction((tx)=>{  
      tx.executeSql('drop table token',[],()=>{  
  
      })  
    },(err)=>{  
      this._errorCB('transaction', err)  
    },()=>{  
      // this._successCB('transaction')  
    })  
  }  
  insertTokenListData(insertData){  

    let len = insertData.length;  
    if (!db) {  
        this.open();  
    }  
    console.log('插入的data',insertData) 
    db.transaction((tx)=>{  
       for(let i=0; i<len; i++){  
        let tokenTable = insertData[i];  
        let tk_address = tokenTable.tk_address;
        let tk_decimals = tokenTable.tk_decimals;
        let tk_name = tokenTable.tk_name;
        let tk_price= tokenTable.tk_price;  
        let tk_symbol= tokenTable.tk_symbol;  
        let tk_selected= tokenTable.tk_selected;  
        let tk_number= tokenTable.tk_number;  

        let sql = "INSERT INTO token(tk_address, tk_decimals, tk_name, tk_price, tk_symbol, tk_selected, tk_number)"+  
        "values(?,?,?,?,?,?,?)";  
        tx.executeSql(sql,[tk_address, tk_decimals, tk_name, tk_price, tk_symbol, tk_selected, tk_number],()=>{  
            
          },(err)=>{  
            console.log(err);  
          }  
        );  
      }  
    },(error)=>{  
      this._errorCB('transaction', error);  
      console.log('数据插入失败')
    },()=>{  
      // this._successCB('transaction insert data');  
      console.log("成功插入 "+len+" 条用户数据")
      this.operateSucces()
    });  
  }  
  close(){  
      if(db){  
          // this._successCB('close');  
          db.close();  
      }else {  
          // console.log("SQLiteStorage not open");  
      }  
      db = null;  
  }  
  // _successCB(name){  
  //   console.log("SQLiteStorage "+name+" success");  
  // }  
  operateSucces(){
    console.log('操作成功')
  }
  _errorCB(name, err){  
    // console.log("SQLiteStorage "+name);  
    console.log(err);  
  }  
    render(){  
        return null;  
    }  
};  