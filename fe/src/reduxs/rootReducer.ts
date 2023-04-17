import { combineReducers } from '@reduxjs/toolkit'

import { accountReducer } from './accounts/account.reducers';
import authReducer from './auths/auth.slices';
import soulReducer from './souls/soul.slices';

const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer,
    soul: soulReducer,
})

export {rootReducer};