// src/users/usersController.ts
import {
    Body, Controller, Get, Path, Post, Query, Route, SuccessResponse,
} from "tsoa";
import { Profile } from "./profile";
import { ProfileService } from "./profiles-service";
import { ScoreData } from "./types";

@Route("profile")
export class UsersController extends Controller {
    @Get("{address}")
    public async getProfile(
        @Path() address: string
    ): Promise<ScoreData | undefined> {
        return new ProfileService().getScore(address);
    }
}
