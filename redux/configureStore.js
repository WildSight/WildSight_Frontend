import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {species} from './reducers/species';
import {grids} from './reducers/grids';
import {sightings} from './reducers/sightings';
import {birds} from './reducers/birds';
import {rawsightings} from './reducers/rawsightings';
import {singlegrids} from './reducers/singlegrids';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from './reducers/auth'
import {UnratifiedSightings}from './reducers/unratified_sightings'
import {Votes} from './reducers/voting';

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
            singlegrids,
            birds,
            rawsightings,
            Auth, 
            UnratifiedSightings,
            Votes
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return {persistor, store};
}