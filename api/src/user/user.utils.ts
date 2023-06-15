import { Reward } from './user.type'

export function reward(point: number): Reward {
  const reward: Reward = {
    mys: 0,
    common: 0,
    gold: 0,
    diamond: 0,
    mythic: 0
  }
  if (point == 30) {
    reward.mys = 30
    reward.diamond = 2
    reward.mythic = 1
  } else if (point == 25) {
    reward.mys = 25
    reward.gold = 1
    reward.diamond = 1
    reward.mythic = 1
  } else if (point == 20) {
    reward.mys = 20
    reward.common = 1
    reward.gold = 1
    reward.diamond = 1
  } else if (point == 15) {
    reward.mys = 10
    reward.gold = 1
  } else if (point == 10) {
    reward.mys = 5
    reward.common = 1
  } else if (point == 5) {
    reward.mys = 1
  }
  return reward
}
export function soulPoint(point: number) {
  if (point >= 30) return 3
  else if (point >= 25) return 2
  else if (point >= 20) return 2
  else if (point >= 15) return 2
  else return 1
}
