import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () =>
  // when redux thunk sees a fn is being returned
  // it calls the fn immediately with dispatch as argument
  async dispatch => {
    const res = await axios.get('/api/current_user');
    // dispatch to reducers only after the get request is completed
    dispatch({ type: FETCH_USER, payload: res.data });
  };
