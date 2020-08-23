import { APPEND_FEED, SET_FEED, UPDATE_FEEDPOST as UPDATE_FEEDPOST } from "../actions/PostsActions";

const initialState = {
    feed: [],
    feedMap: {}
}


const PostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FEED: {

            let posts = action.posts || [];
            let feedMap = {}; //reset feed map
            posts.forEach(post => {
                feedMap[post._id] = post;
            });
            
            return { ...state, feed: posts, feedMap};
        }
        case APPEND_FEED: {
            let posts = action.posts || [];
            let feedMap = state.feedMap;
            posts.forEach(post => {
                feedMap[post._id] = post;
            });
            return { ...state, feed: [...state.feed, ...posts], feedMap };
        }
        case UPDATE_FEEDPOST: {
            let postsCopy = state.feed;
            // let feedMapCopy = JSON.parse(JSON.stringify(state.feedMap));
            let feedMap = state.feedMap;
            let postId = action.postId;
            let newPostData = JSON.parse(JSON.stringify(action.postData));
            
            console.log(`Updating: ${postId}`);
            let indexOfPostToUpdate = postsCopy.findIndex((post)=>post._id == postId);
            postsCopy[indexOfPostToUpdate] = newPostData;
            
            feedMap[postId] = newPostData;
            
            return {...state, feed: postsCopy, feedMap}
        }
        default:
            return state
    }
};

export default PostsReducer;