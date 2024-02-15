import { Keypair } from "@solana/web3.js";
import * as readline from 'readline';
import wallet from "./dev-wallet.json"

let kp = Keypair.generate()

//console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`)
//console.log(`You've generated a new Solana wallet secret key: ${kp.secretKey}`);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



function base58_to_wallet() {
const bs58 = require('bs58');

rl.question('Enter your address to turn into into wallet: ', (answer) => {
        var publickey = bs58.decode(answer)
        console.log(publickey);
        rl.question('Want to turn your address from wallet format into base58? [y/n] ', (answer) => {
        switch(answer.toLowerCase()){
            case 'y':
                    wallet_to_base58();
                break;
            case 'n':
                console.log("fin");
                return;    
        }
    });
    rl.close
    })
    }
              


base58_to_wallet()

function wallet_to_base58() {
const bs58 = require('bs58');
var privatekey = new Uint8Array(wallet)
console.log('This is base58 given wallet: ', bs58.encode(privatekey));
}
