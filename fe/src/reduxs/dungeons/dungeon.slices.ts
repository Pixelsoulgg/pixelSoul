import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GameApi from "@/apis/game.api";
import { DungeonGameType, IChallenge, IGameDungeon, UserChallengeObject } from "@/types/dungeon.types";
import ChallengeApi from "@/apis/challenge.api";

interface DungeonState {
  games: IGameDungeon[];
  isFetchingGame: boolean;
  challenges: UserChallengeObject[];

  gameType: DungeonGameType;

  gameId?: number;
  isSubmit?: boolean;
}

const initialState: DungeonState = {
  isFetchingGame: false,
  gameType: DungeonGameType.All,

  games: [],
  challenges: [],
};

export const dungeonSlice = createSlice({
  name: "dungeons",
  initialState,
  reducers: {
    chooseGameId: (state, { payload }: PayloadAction<number>) => {
      state.gameId = payload;
    },
    changeGameTypeAction: (state, { payload }: PayloadAction<DungeonGameType>) => {
      state.gameType = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGamesAction.fulfilled, (state, { payload }) => {
      state.games = payload;
      state.isFetchingGame = false;
      if (payload.length > 0) {
        state.gameId = payload[0].appId;
      }
    });
    builder.addCase(getGamesAction.pending, (state) => {
      state.isFetchingGame = true;
    });
    builder.addCase(getGamesAction.rejected, (state) => {
      state.isFetchingGame = false;
    });

    builder.addCase(getChallengesAction.fulfilled, (state, { payload }) => {
      state.challenges = payload;
    });

    builder.addCase(checkChallengeStatusAction.pending, (state) => {
      state.isSubmit = true;
    });

    builder.addCase(checkChallengeStatusAction.rejected, (state) => {
      state.isSubmit = false;
    });

    builder.addCase(checkChallengeStatusAction.fulfilled, (state, {payload}) => {
      if (payload.result) {
        const {challenges} = state;
        state.challenges =challenges.filter((p) => p.challengeId !== payload.challengeId);
      }
      state.isSubmit = false;
    });



    builder.addCase(activeChallengeAction.pending, (state) => {
      state.isSubmit = true;
    });

    builder.addCase(activeChallengeAction.rejected, (state) => {
      state.isSubmit = false;
    });

    builder.addCase(activeChallengeAction.fulfilled, (state, {payload}) => {
      if (payload.status !== 0) {
        const {challenges} = state;
        const index = challenges.findIndex((p) => p.challengeId === payload.challengeId);
        if (index > -1) {
          challenges[index].status = payload.status;
          state.challenges = challenges;
        }
      }
      state.isSubmit = false;
    })

  },
});

export const { chooseGameId, changeGameTypeAction } = dungeonSlice.actions;
export default dungeonSlice.reducer;

export const getGamesAction = createAsyncThunk<IGameDungeon[]>(
  "dungeon/getGamesAction",
  async () => {
    const gameApi = new GameApi();
    const rs = await gameApi.getGames();
    return rs;
  }
);

export const getChallengesAction = createAsyncThunk<
  UserChallengeObject[],
  string
>("dungeon/getChallengesAction", async (steamId) => {
  const challengeApi = new ChallengeApi();
  const rp = await challengeApi.getChallengesBySteamId(steamId);
  return rp;
});

export const activeChallengeAction = createAsyncThunk<
  IChallenge,
  { steamId: string; challengeId: number }
>("dungeon/activeChallengeAction", async ({steamId, challengeId}) => {
  const challengeApi = new ChallengeApi();
  const rp = await challengeApi.activeChallenge(steamId, challengeId);
  return rp;
});

export const checkChallengeStatusAction = createAsyncThunk<
  {result: boolean, challengeId: number, msg?: string},
  { steamId: string; challengeId: number }
>("dungeon/checkChallengeStatusAction", async ({steamId, challengeId}) => {
  const challengeApi = new ChallengeApi();
  const rp = await challengeApi.checkChallenge(steamId, challengeId);
  return {result: rp.complete, challengeId, msg: rp.message};
});
