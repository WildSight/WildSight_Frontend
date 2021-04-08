import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {species} from './reducers/species';
import {grids} from './reducers/grids';
import {sightings} from './reducers/sightings';
import {birds} from './reducers/birds';
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
            species,
            sightings,
            grids,
            birds,
            Auth
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return {persistor, store};
}