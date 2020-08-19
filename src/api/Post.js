import Network from '../helpers/Network';

const FEED_POST_PAGE_SIZE = 8;

export const PostController = {
    feedPostCache: {

    },
    postDetailCache: {

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
            console.log(lastPostDate);
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
                        
            let response = await Network.JsonRequest('GET',`/post/${postId}`);            
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
                        
            let response = await Network.JsonRequest('GET',`/post/${postId}`);            
            this.feedPostCache[response._id] = response;

            return response;
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }        
    },
    async ReactToPost(postId) {

    },
    async UnreactToPost(postId) {

    }
}