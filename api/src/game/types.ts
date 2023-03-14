import { Player } from "../player/types";

export interface Game {
    id: string;
    name: string;
    logoURL: string;
    balance: number;
    description: string;
    sbtAmount: number;
}
export interface SbtCollectible {
    name: string;
    requirement: string;
    value: number;
    holder: number;
    progress: number;
    gameId: string;
}
export interface Challenge {
    name: string;
    reward: string;
    status: string;
    player: Player[];
    progress: number;
    gameId: string;
}
