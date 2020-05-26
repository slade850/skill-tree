import { combineReducers } from 'redux';

import auth from './auth';
import tree from './tree';

const creatRootReducer = combineReducers({
    tree,
    auth,
});

export default creatRootReducer;