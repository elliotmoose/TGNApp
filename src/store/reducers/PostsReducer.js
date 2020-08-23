import { APPEND_FEED, SET_FEED } from "../actions/PostsActions";

const initialState = {
    feed: []
}

const PostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FEED: {
            let posts = action.posts || [];
            return { ...state, feed: posts };
        }
        case APPEND_FEED: {
            let posts = action.posts || [];
            return { ...state, feed: [...state.feed, ...posts] };
        }
        default:
            return state
    }
};

export default PostsReducer;