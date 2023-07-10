import { Injectable } from '@nestjs/common'
import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Database,
  getDatabase,
  get,
  ref,
  child,
  onChildChanged,
  onChildAdded,
  DataSnapshot
} from 'firebase/database'
import { FIREBASE_DB_URL } from '../app.settings'
@Injectable()
export class FirebaseService {
  database: Database
  app: FirebaseApp
  constructor() {
    const firebaseConfig = {
      databaseURL: FIREBASE_DB_URL
    }

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig)
  }

  listen(path: string, fn: (sns: DataSnapshot) => Promise<void>) {
    const db = getDatabase()
    const lref = ref(db, path)
    onChildChanged(lref, (snapshot) => {
      fn(snapshot)
    })

    onChildAdded(lref, (snapshot) => {
      fn(snapshot)
    })
  }

  async leaderBoardBot() {
    const dbRef = ref(getDatabase())
    const bots = await get(child(dbRef, `leaderboard_bots`))
    const arrBots = []
    bots.forEach((f) => {
      arrBots.push(f.val())
    })
    return arrBots
  }

  async leaderBoardHuman() {
    const dbRef = ref(getDatabase())
    const bots = await get(child(dbRef, `leaderboard_users`))
    const arrHuman = []
    bots.forEach((f) => {
      arrHuman.push(f.val())
    })
    //return 
    return arrHuman
  }


}
