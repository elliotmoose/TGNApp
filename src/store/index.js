import { createStore, combineReducers, applyMiddleware } from 'redux';
import PostsReducer from './reducers/PostsReducer';
import UserReducer from './reducers/UserReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    posts: PostsReducer,
    user: UserReducer
})

const store = createStore(reducers, applyMiddleware(thunk));
export default store;