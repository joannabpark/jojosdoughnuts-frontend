import { combineReducers } from 'redux';
import doughnuts from './doughnuts';
import order from './order';
import user from './user';
import order_items from './order_items';

export default combineReducers({
    doughnuts,
    order_items,
    order,
    user
})