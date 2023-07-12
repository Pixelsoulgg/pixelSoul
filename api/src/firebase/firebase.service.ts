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

  async listen(path: string, fn: (board: DataSnapshot) => Promise<void>) {
    const db = getDatabase()
    const lref = ref(db, path)
    const auths = await this.auth()
    let childrenCount = 0
    onChildChanged(lref, async (snapshot) => {
      fn(snapshot)
    })

    onChildAdded(lref, async (snapshot, pre) => {
      childrenCount += 1
      if (childrenCount > auths.length) {
        console.log('call process funciton')
        fn(snapshot)
      }
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
    const arrBots = []
    bots.forEach((f) => {
      arrBots.push(f.val())
    })
    return arrBots
  }

  async auth() {
    const dbRef = ref(getDatabase())
    const auths = await get(child(dbRef, `auth`))
    const arr = []
    auths.forEach((f) => {
      arr.push(f.val())
    })
    return arr
  }

  async hero(name: string) {
    const dbRef = ref(getDatabase())
    const hero = await get(child(dbRef, `auth/${name}`))
    return hero
  }
}
