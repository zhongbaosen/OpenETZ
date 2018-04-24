import React from 'react'
import SQLite from 'react-native-sqlite-storage'
SQLite.enablePromise(true)

var database_name = "test.db"
var database_version = "1.0"
var database_displayname = "Test"
var database_size = -1

let updateNum = 0

class AmountDatabase  {

    constructor(){
        SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then( res =>{
            this.conn = res
        }).catch(err => {
            console.log('22222222',err)
        })
    }

    createAmountTable(){ 
        console.log('this.conn===',this.conn)
        this.conn.transaction( tx => {
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
                console.log('create amount successful')
              }, (err)=> {  
                console.log('create amount err',err)
            })
        }) 
    } 

    deleteAccountAllData(query){  
        this.conn.transaction( tx => {
            tx.executeSql(query.sql,query.parame,() => {
                console.log('delete account data successful')
            })
        })   
    } 

    dropAccountTable(){  

        this.conn.transaction( tx => {
            tx.executeSql('drop table account',[],() => {
                console.log('delete account table successful')
            })
        })
    } 

    async deleteAccount(query){
        let delFinish = ''
        try{
            await this.conn.transaction( tx => {
                delFinish = this.delete(query,tx)
            })
        } catch(err){
            delFinish = 'fail'
            console.log('删除失败1')
        }
        return delFinish
    }
    async delete(query,tx){
        let deleteFinished = ''
        try{
            await tx.executeSql(query.sql,query.d_id)
            deleteFinished = 'success'
        }catch(err){
            deleteFinished = 'fail'
            console.log('删除失败2')
        }
        return deleteFinished
    }

    //   ---
    async updateTable(query){
        let upTabFinished = ''
        try {
            await this.conn.transaction( tx => {
                upTabFinished = this.updateTab(query,tx)
            })
        }catch (err){
            upTabFinished = 'fail'
        }
        return upTabFinished
    }
    async updateTab(query,tx){
        let upFinished = ''
        try{
            await tx.executeSql(query.sql,query.parame)
            upFinished = 'success'
        }catch(err){
            upFinished = 'fail'
        }
        return upFinished
    }

    async selectAccountTable(query){

        let res = []
        try {
            await this.conn.transaction( tx1 => {
                res = this.select(tx1,query)
            })
        } catch (err){
            res = []
            // console.log('22222',err)
        }
        return res
    }

    async select(tx1,query){
        let allAccounts = []
        try {
            let res = await tx1.executeSql(query,[])
            let len = res[1].rows.length 
            for(let i=0; i<len; i++){  
              let u = res[1].rows.item(i)
              allAccounts.push(u)
            } 

        } catch(err){
            console.log('select account table err',err)
        }
        return allAccounts
    }

    async insertToAccontTable(accountData){  
        let len = accountData.length;  
 
        console.log('account table insert data',accountData) 

        let insertSuccess = false
        await this.conn.transaction( tx =>{  

            return Promise.all(accountData.map(async (query,idx) => {
                try {
                    const { account_name, mnemonic, is_selected, assets_total, backup_status, address, kid, version, cipher, ciphertext, kdf, mac, dklen, salt, n,r,p,iv } = query


                    let sql = "INSERT INTO account(account_name,mnemonic,is_selected,assets_total,backup_status,address,kid,version,cipher,ciphertext,kdf,mac,dklen,salt,n,r,p,iv)"+  
                              "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    await tx.executeSql(sql,[account_name,mnemonic,is_selected,assets_total,backup_status,address,kid,version,cipher,ciphertext,kdf,mac,dklen,salt,n,r,p,iv])

                    insertSuccess = true

                } catch(err){
                    
                    insertSuccess = false

                    console.log('insert account err',err)
                }
            })) 
        })
        return insertSuccess
    }  


    // closeDatabase(){
    //     this.conn.close().then(this.dbCloseSuccess).catch(this.dbCloseError)
    // }

    // dbCloseSuccess(res){

    // }

    // dbCloseError(err){

    // }
}

const accountDB = new AmountDatabase()


export default accountDB