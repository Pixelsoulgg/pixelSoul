export enum DungeonGameType {
  All,
  Action,
  Arena,
}

export interface IGameDungeon {
  id: number;
  steamId: number;
  name: string;
  description: string;
  gameUrl: string;
  logo: string;
  socialTwitter: string;
  socialDiscord: string;
  socialTelegram: string;
  gameTypeId: number;
  appId: number;
  gameTypes: {
    id: number;
    name: string;
    description: string | null;
  };
}

export interface ChallengeObject {
  id: number;
  name: string;
  gameId: number;
  description: string | null;
  goldReward: number;
  requirementId: number;
}

export interface IChallenge {
  userSteamId: string;
  challengeId: number;
  actived: number;
  status: number;
}

export interface UserChallengeObject extends IChallenge {
  userSteamId: string;
  challengeId: number;
  actived: number;
  status: number;
  challenge: ChallengeObject;
}

export interface IDungeonCheckResponse {
  complete: boolean;
  message: string;
}
