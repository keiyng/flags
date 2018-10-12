import {combineReducers} from 'redux';
import authReducer from './authReducer';

//the central state object
export default combineReducers({
    auth: authReducer
})