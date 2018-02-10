var express = require("express");
var path = require("path")
//npm install express
var app = express();
//npm install body-parser
const abiDecoder = require('abi-decoder'); // NodeJS

var bodyParser = require("body-parser"); //handles form submission data from post
var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "test",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "minter",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Sent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "receiver",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "receiver",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "send",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
abiDecoder.addABI(abi);


//Server anything in the webpage directory
app.use(express.static(path.join(__dirname, 'webpage/')))

var Web3 = require('web3')
var web3 = new Web3()
// console.log(web3.version)
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
var coinbase = web3.eth.coinbase;
// console.log(coinbase)
var accountNumber = web3.eth.coinbase


app.use(express.static(path.join(__dirname ,'webpage/')))
app.use(bodyParser.urlencoded({extended: false}));
app.post("/data", (req, res) => { //access body of post request

//make variables for each data point (in form.html, name="XYZ" --> var XYZ=req.body.XYZ)
    var isPaidTooLow=req.body.isPaidTooLow;
    var isDangerInEmergency=req.body.isDangerInEmergency;
    var district=req.body.district;

//    var isDangerForSpeakingOut=req.body.isDangerForSpeakingOut;
//    var isDifferentJobDescription=req.body.isDifferentJobDescription;
//    var isIdentityRansomed=req.body.isIdentityRansomed;
//    var isChildLabor=req.body.isChildLabor;
//    var isCoercion=req.body.isCoercion;
//    var isInDebt=req.body.isInDebt;
//    var isRestrictedToLeave=req.body.isRestrictedToLeave;
//    var isDiscriminated=req.body.isDiscriminated;

//do what u want w data here, before res.end
//print on console to confirm
    // console.log(isPaidTooLow);
    // console.log(isDangerInEmergency);
    // console.log(district);
//    console.log(isDangerForSpeakingOut);
//    console.log(isDifferentJobDescription);
//    console.log(isIdentityRansomed);
//    console.log(isChildLabor);
//    console.log(isCoercion);
//    console.log(isInDebt);
//    console.log(isRestrictedToLeave);
//    console.log(isDiscriminated);

	unlockAccount();
	var _isPaidTooLow = (isPaidTooLow == 'true');
	var _isDangerInEmergency =  (isDangerInEmergency == 'true')/* var of type bool here */ ;
	var _district = district/* var of type string here */ ;
	var formContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getIsDangerInEmergency","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"formCreator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getIsPaidTooLow","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDistrict","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_isPaidTooLow","type":"bool"},{"name":"_isDangerInEmergency","type":"bool"},{"name":"_district","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
	var form = formContract.new(
	   _isPaidTooLow,
	   _isDangerInEmergency,
	   _district,
	   {
	     from: web3.eth.accounts[0], 
	     data: '0x6060604052341561000f57600080fd5b60405161053d38038061053d83398101604052808051906020019091908051906020019091908051820191905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600060146101000a81548160ff02191690831515021790555081600060156101000a81548160ff02191690831515021790555080600190805190602001906100c79291906100d0565b50505050610175565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061011157805160ff191683800117855561013f565b8280016001018555821561013f579182015b8281111561013e578251825591602001919060010190610123565b5b50905061014c9190610150565b5090565b61017291905b8082111561016e576000816000905550600101610156565b5090565b90565b6103b9806101846000396000f30060606040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806309987ca614610072578063386ad6fc1461009f5780634c86b8f7146100f4578063dd07cb7414610121578063f8a8fd6d146101af575b600080fd5b341561007d57600080fd5b61008561023d565b604051808215151515815260200191505060405180910390f35b34156100aa57600080fd5b6100b2610253565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100ff57600080fd5b610107610278565b604051808215151515815260200191505060405180910390f35b341561012c57600080fd5b61013461028e565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610174578082015181840152602081019050610159565b50505050905090810190601f1680156101a15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101ba57600080fd5b6101c2610336565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102025780820151818401526020810190506101e7565b50505050905090810190601f16801561022f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60008060149054906101000a900460ff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060149054906101000a900460ff16905090565b610296610379565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561032c5780601f106103015761010080835404028352916020019161032c565b820191906000526020600020905b81548152906001019060200180831161030f57829003601f168201915b5050505050905090565b61033e610379565b6040805190810160405280600b81526020017f68656c6c6f20776f726c64000000000000000000000000000000000000000000815250905090565b6020604051908101604052806000815250905600a165627a7a72305820228d4be42ad61731f4d4e78fa17c49ed2cb7539c221966dfc1d9c47d3446f2f90029', 
	     gas: '4700000'
	   }, function (e, contract){
	    console.log(e, contract);
	    if (typeof contract.address !== 'undefined') {

	         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	         console.log(contract.getDistrict());
	         res.end("data!") //ends ur processing

	    }
	 })


});

app.get('/transactions', (req, res) => {
	unlockAccount();
    var transactions = getTransactionsByAccount(accountNumber, 0, 200)
    res.send(transactions)

})



app.listen(9000, () => console.log('Server listening on port 9000!'))

function unlockAccount(){
	// Unlock the coinbase account to make transactions out of it
	console.log("Unlocking coinbase account");
	var password = "1234";
	try {
	    web3.personal.unlockAccount(web3.eth.coinbase, password);
	} catch (e) {
	    console.log(e);
	    return;
	}

}

//Thank you : https://ethereum.stackexchange.com/questions/2531/common-useful-javascript-snippets-for-geth/3478#3478
function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
	var transactions = []

    if (endBlockNumber == null) {
        endBlockNumber = web3.eth.blockNumber;
        console.log("Using endBlockNumber: " + endBlockNumber);
    }
    if (startBlockNumber == null) {
        startBlockNumber = endBlockNumber - 1000;
        console.log("Using startBlockNumber: " + startBlockNumber);
    }
    console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks " + startBlockNumber + " and " + endBlockNumber);

    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
        if (i % 50 == 0) {
            console.log("Searching block " + i);
        }
        var block = web3.eth.getBlock(i, true);
        if (block != null && block.transactions != null) {
            block.transactions.forEach(function(e) {
                if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                	// transactions.push(abiDecoder.decodeMethod(e.input));
                    transactions.push({
                    	"tx hash"          :  e.hash, 
                        nonce           :  e.nonce,
                        blockHash       :  e.blockHash, 
                        blockNumber     :  e.blockNumber, 
                        transactionIndex:  e.transactionIndex,
                        from            :  e.from,
                        to              :  e.to,
                        value           :  e.value,
                        time            :  block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString(),
                        gasPrice        : e.gasPrice, 
                        gas             : e.gas, 
                        input           : web3.toAscii(e.input)});
                    console.log("  tx hash          : " + e.hash + "\n"
			            + "   nonce           : " + e.nonce + "\n"
			            + "   blockHash       : " + e.blockHash + "\n"
			            + "   blockNumber     : " + e.blockNumber + "\n"
			            + "   transactionIndex: " + e.transactionIndex + "\n"
			            + "   from            : " + e.from + "\n" 
			            + "   to              : " + e.to + "\n"
			            + "   value           : " + e.value + "\n"
			            + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
			            + "   gasPrice        : " + e.gasPrice + "\n"
			            + "   gas             : " + e.gas + "\n"
			            + "   input           : " + e.input);
                    // transactions.push(
                    // 	"  tx hash          : " + e.hash + "\n" +
                    //     "   nonce           : " + e.nonce + "\n" +
                    //     "   blockHash       : " + e.blockHash + "\n" +
                    //     "   blockNumber     : " + e.blockNumber + "\n" +
                    //     "   transactionIndex: " + e.transactionIndex + "\n" +
                    //     "   from            : " + e.from + "\n" +
                    //     "   to              : " + e.to + "\n" +
                    //     "   value           : " + e.value + "\n" +
                    //     "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n" +
                    //     "   gasPrice        : " + e.gasPrice + "\n" +
                    //     "   gas             : " + e.gas + "\n" +
                    //     "   input           : " + web3.toAscii(e.input));
                }
            })
        }
    }
    return transactions;
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
// TEST COIN CONTRACT 
// //address at smart contract:
// var firstContractAddress="0x1a619067cb7bf7b76f3932fb9cdc17fe26a610f2"
// //for smart contract
// 