import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from
"@solana/web3.js"

import wallet from "./dev-wallet.json"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com");

(async () => {
try {
    var to = new PublicKey("E6hchQnUpSbtiScfUfoBQqtGoZgfvAkw6vwBbSXecABj");

    // Get balance of dev wallet
    const balance = await connection.getBalance(keypair.publicKey)
    // Create a test transaction to calculate fees
    const transaction = new Transaction().add(
    SystemProgram.transfer({
    fromPubkey: keypair.publicKey, //from
    toPubkey: to, //to
    lamports: balance,
    })

    );
    transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        
        transaction.feePayer = keypair.publicKey;
        // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
        const fee = (await connection.getFeeForMessage(transaction.compileMessage(),
            'confirmed')).value || 0;
            // Remove our transfer instruction to replace it
            transaction.instructions.pop();
            // Now add the instruction back with correct amount of LAMPORTS

            transaction.add(
                SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: to,
                lamports: balance - fee,
                })
                );

                const signature = await sendAndConfirmTransaction(connection, transaction, [
                    keypair,
                  ], {skipPreflight: true});
                  console.log(`Success! Check out your TX here:
                      https://explorer.solana.com/tx/${signature}?cluster=devnet`);
                } catch (e) {
                  console.error(`Oops, something went wrong: ${e}`);
                }
              })();