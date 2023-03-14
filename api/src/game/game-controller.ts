import {
    Body, Controller, Get, Path, Post, Query, Route, SuccessResponse,
} from "tsoa";
import { GameService } from "./game-service";
import { Challenge, Game, SbtCollectible } from "./types";

@Route("game")
export class GameController extends Controller {
    @Get("")
    public async gameList(): Promise<Game[]> {
        const service = new GameService();
        return service.getGameList();
    }
    @Get("collectible/{gameId}")
    public async collectible(
        @Path() gameId: string): Promise<SbtCollectible | undefined> {
        const service = new GameService();
        return service.getSbtCollectible(gameId);
    }
    @Get("challenge/{gameId}")
    public async challenge(
        @Path() gameId: string): Promise<Challenge | undefined> {
        const service = new GameService();
        return service.getChallenge(gameId);
    }
}
