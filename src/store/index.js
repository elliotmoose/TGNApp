import { createStore, combineReducers } from 'redux';
import PostsReducer from './reducers/PostsReducer';

const reducers = combineReducers({
    posts: PostsReducer
})

const store = createStore(reducers);
export default store;