import { DataSnapshot } from 'firebase/database'
import { FirebaseService } from '../firebase.service'

async function updateUserInfor(data: DataSnapshot) {
  // update to sui chain

  console.log(data.toJSON(), data.ref.key)
}
async function main() {
  const fb = new FirebaseService()
  fb.listen('/battles', updateUserInfor)
}

main().catch((err) => console.log('job error', err))
