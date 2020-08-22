import Network from '../helpers/Network';

const FEED_POST_PAGE_SIZE = 8;

export const PostController = {
    feedPostCache: {

    },
    postDetailCache: {

    },
    async MakePost(content, postType, targetId) {
        try {
            let body = {content, postType};
            if(targetId) {
                body.target = targetId;
            }

            let response = await Network.JsonRequest('POST', '/posts', body);
            return response;
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.error(error);            
        }
    },
    async GetFeedHead() {
        try {
            let response = await Network.JsonRequest('GET',`/feed?limit=${FEED_POST_PAGE_SIZE}`);
            return response;
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }        
    },
    async GetFeedInfinite(lastPostDate) {
        try {
            let beforeQuery = lastPostDate ? `&before=${lastPostDate}` : '';
            let response = await Network.JsonRequest('GET',`/feed?limit=${FEED_POST_PAGE_SIZE}` + beforeQuery);
            return response || [];
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }        
    },
    async GetFeedPost(postId) {
        console.log(`getting post: ${postId}`);
        try {
            if(this.feedPostCache[postId])
            {
                console.log('found in cache');
                return this.feedPostCache[postId];
            }
                        
            let response = await Network.JsonRequest('GET',`/posts/${postId}`);            
            this.feedPostCache[response._id] = response;

            return response;
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }        
    },
    async CommentOnPost(postId) {
        try {
            if(this.feedPostCache[postId])
            {
                console.log('found in cache');
                return this.feedPostCache[postId];
            }
                        
            let response = await Network.JsonRequest('GET',`/posts/${postId}`);            
            this.feedPostCache[response._id] = response;

            return response;
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }        
    },
    async ReactToPost(postId, reactionType) {
        try {
            let response = await Network.JsonRequest('POST', `/posts/${postId}/react`, {reactionType});
            console.log(response);

        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }
    },
    async UnreactToPost(postId, reactionType) {
        try {
            await Network.JsonRequest('POST', `/posts/${postId}/unreact`, {reactionType});
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }
    }
}