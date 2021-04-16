import { applyMiddleware,createStore,combineReducers } from 'redux';
import middlewares from './middlewares';
import reducers from './reducer';

const dynamicReducers = {};
const store = createStore(combineReducers({...reducers}),applyMiddleware(...middlewares));

export const addReducer = (reducer = {})=>{
    if (Object.prototype.toString.call(reducer) !== '[object Object]') {
        throw new Error(`reducer must be a object.`);
      }
    
      Object.keys(reducer).forEach((key) => {
        if (dynamicReducers[key]) {
          throw new Error(`reducer ${key} is existed.`);
        }
      });
    
      Object.assign(dynamicReducers, reducer);
    
      store.replaceReducer(combineReducers({ ...reducers, ...dynamicReducers }));
}

export default store;
