import { APPEND_FEED, SET_FEED, UPDATE_FEEDPOST, UPDATE_POST_CACHE } from "../actions/PostsActions";

const initialState = {
    feed: [],
    cache: {} 
}


const PostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FEED: {
            let posts = action.posts || [];            
            return { ...state, feed: posts};
        }
        case APPEND_FEED: {
            let posts = action.posts || [];
            return { ...state, feed: [...state.feed, ...posts]};
        }
        case UPDATE_FEEDPOST: {
            let postsCopy = state.feed;
            let cache = state.cache;
            let postId = action.postId;
            let newPostData = JSON.parse(JSON.stringify(action.postData));
            
            let indexOfPostToUpdate = postsCopy.findIndex((post)=>post._id == postId);
            postsCopy[indexOfPostToUpdate] = newPostData;
            
            cache[postId] = newPostData;
            
            return {...state, feed: postsCopy, cache}
        }
        /**
         * Inserts posts into cache, and forces update for posts that are newly updated
         */
        case UPDATE_POST_CACHE: {
            let cache = state.cache;
            for(let post of action.posts) {
                if(!post._id) {
                    continue;
                }
                cache[post._id] = JSON.parse(JSON.stringify(post));
            }
            return {...state, cache}
        }
        default:
            return state
    }
};

export default PostsReducer;