export function splitNumber(string){
          let sss = ''

          if(parseFloat(string) < 1){
            let dd = aa(string.toString().slice(2))
            sss = '0.' + dd
          }else{
            sss = aa(string.toString())
          }
          
          return sss

    }

    function aa(str){
      let rmb='',
            i2=0;
      for(let i=str.length-1; i>=0; i--){
              if(i%3==0&&i!=0){
                  rmb+=str[i2]+','
              }else{
                  rmb+=str[i2]
              }
              i2++
          }
          return rmb
    }

