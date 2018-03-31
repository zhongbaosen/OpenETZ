//async 
export function address2etz(addr){
	let assetsTotal = '0' 
	web3.eth.getBalance(`0x${addr}`).then((res,rej) => {
    	assetsTotal = web3.utils.fromWei(res,'ether')
	})
    return assetsTotal
}