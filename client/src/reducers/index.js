import {combineReducers} from 'redux';
import authReducer from './authReducer';
import recordReducer from './recordReducer';

//the central state object
export default combineReducers({
    auth: authReducer,
    record: recordReducer
})