import { combineReducers } from '@reduxjs/toolkit'

import { accountReducer } from './accounts/account.reducers';
import authReducer from './auths/auth.slices';
import soulReducer from './souls/soul.slices';
import dungeonReducer from './dungeons/dungeon.slices';
import { api } from '@/services/api';

const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer,
    soul: soulReducer,
    dungeon: dungeonReducer,
    api: api.reducer
})

export {rootReducer};