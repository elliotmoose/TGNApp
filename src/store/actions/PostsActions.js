export const SET_FEED = 'SET_FEED';
export const APPEND_FEED = 'APPEND_FEED';
export const UPDATE_FEEDPOST = 'UPDATE_FEEDPOST';
export const UPDATE_POST_CACHE = 'UPDATE_POST_CACHE';

export const SetFeed = (posts) => ({
  type: SET_FEED,
  posts
})

export const AppendFeed = (posts) => ({
  type: APPEND_FEED,
  posts
})

export const UpdateFeedPostById = (postId, postData) => ({
  type: UPDATE_FEEDPOST,
  postId,
  postData
})

export const UpdatePostCache = (posts) => ({
  type: UPDATE_POST_CACHE,
  posts
})

