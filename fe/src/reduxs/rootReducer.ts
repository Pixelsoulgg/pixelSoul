import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { accountReducer } from './accounts/account.reducers';
import authReducer from './auths/auth.slices';

const createNoopStorage = () => ({
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  });

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();


const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer,
})

export {rootReducer};