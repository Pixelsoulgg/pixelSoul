import { DataSnapshot } from 'firebase/database'
import { FirebaseService } from '../firebase.service'
import {
  JsonRpcProvider,
  testnetConnection,
  RawSigner,
  TransactionBlock,
  fromExportedKeypair,
  toB64,
  devnetConnection
} from '@mysten/sui.js'
import { ADMIN_CAP, PACKAGE_ID } from 'src/app.settings'
import { buildSigner } from '../firebase.utils'

async function updateUserInfor(board: DataSnapshot) {
  // update to sui chain
  let objectId = board.val()?.object_id
  if (objectId) {
    const address = board.val()?.address
    const p_level = board.val()?.p_level
    const p_xp = board.val()?.p_xp
    const wins_bots = board.val()?.wins_bots
    const wins_users = board.val()?.wins_users

    const signer = await buildSigner()
    const tx = new TransactionBlock()
    tx.moveCall({
      target: `${PACKAGE_ID}::brawlz::update_hero`,
      arguments: [
        tx.pure(ADMIN_CAP),
        tx.pure(objectId),
        tx.pure(p_level),
        tx.pure(p_xp),
        tx.pure(wins_bots),
        tx.pure(wins_users)
      ]
    })
    const update = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx
    })
    const tx_transfer = new TransactionBlock()

    tx_transfer.transferObjects([tx_transfer.object(objectId)], tx_transfer.pure(address))
    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx_transfer
    })
    console.log('tx', update, result)
  }
}

async function main() {
  const fb = new FirebaseService()
  fb.listen('/auth', updateUserInfor)
}

main().catch((err) => console.log('job error', err))
