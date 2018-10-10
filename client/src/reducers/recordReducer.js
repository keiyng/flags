import {SAVE_RESULTS} from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case SAVE_RESULTS:
            return action.payload || false;
        default: 
            return state
    }
}