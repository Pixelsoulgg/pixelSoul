import { Challenge, Game, SbtCollectible } from "./types";

export class GameService {
    constructor() {
        this.initData();
    }
    gameList: Game[] = [];
    collectibles: SbtCollectible[] = [];
    challenges: Challenge[] = [];
    initData() {
        for (let index = 0; index < 10; index++) {
            const game: Game = {
                name: "Game" + (index + 1),
                logoURL: "https://",
                balance: 10 + index,
                description: "Game online blockchain " + (index + 1),
                sbtAmount: 100 + index,
                id: `${index + 1}`
            }
            this.gameList.push(game);
            const collectible: SbtCollectible = {
                name: "ETH holder" + (index + 1),
                requirement: `Hold ${index + 1} ETH`,
                value: index,
                holder: index + 1,
                progress: 90 + index,
                gameId: `${index + 1}`
            }
            this.collectibles.push(collectible);
            const challenge: Challenge = {
                name: `Play for ${index + 1} hours`,
                reward: `${10 + index} Golds`,
                status: index % 2 == 0 ? "completed" : "In progress",
                player: [],
                progress: 90 + index,
                gameId: `${index + 1}`
            }
            this.challenges.push(challenge)
        }

    }
    async getGameList(): Promise<Game[]> {
        return this.gameList;
    }
    async getSbtCollectible(gameId: string): Promise<SbtCollectible | undefined> {
        const colectible = this.collectibles.find(f => f.gameId == gameId);
        return colectible;
    }
    async getChallenge(gameId: string): Promise<Challenge | undefined> {
        const challenge = this.challenges.find(f => f.gameId == gameId);
        return challenge;
    }
}