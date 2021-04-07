import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {species} from './reducers/species';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from './reducers/auth'
const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
  }

  export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            species, Auth
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return {persistor, store};
}