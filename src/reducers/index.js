import {combineReducers} from 'redux';
import dotsReducer from './DotsReducer';

const allReducers = combineReducers({
    dotsReducer: dotsReducer
});

export default allReducers;
