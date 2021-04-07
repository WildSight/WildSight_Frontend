import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
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

//   let composeEnhancers = compose;
//   if(_DEV_){
//       composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
//   }
const enhance = composeWithDevTools({
    realtime:true,
    hostname:"192.168.1.9",
    port:19000
})
  export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            species, Auth
        }),
        applyMiddleware(thunk, logger)
        // enhance(applyMiddleware(thunk))
        // composeEnhancers(applyMiddleware(thunk))
    );

    const persistor = persistStore(store);

    return {persistor, store};
}