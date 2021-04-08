import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {species} from './reducers/species';
import {grids} from './reducers/grids';
import {sightings} from './reducers/sightings';
import {birds} from './reducers/birds';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            birds
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return {persistor, store};
}