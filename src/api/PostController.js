import Network from '../helpers/Network';
import store from '../store';
import { SetFeed, AppendFeed } from '../store/actions/PostsActions';

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
    async LoadFeed() {
        try {
            let response = await Network.JsonRequest('GET',`/feed?limit=${FEED_POST_PAGE_SIZE}`);
            store.dispatch(SetFeed(response));
            return response;
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }        
    },
    async LoadFeedNext() {
        try {
            let posts = store.getState().posts.feed || [];
            if(!posts) {
                let response = await this.LoadFeed();
                return response;
            }

            let lastPostDate = posts[posts.length-1].datePosted;
            let beforeQuery = lastPostDate ? `&before=${lastPostDate}` : '';
            let response = await Network.JsonRequest('GET',`/feed?limit=${FEED_POST_PAGE_SIZE}` + beforeQuery);

            store.dispatch(AppendFeed(response));
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


    // async onReactToPost(postId, reactionType) {
    //     let posts = this.state.posts;
    //     let post = this.state.postMap[postId];

    //     if(!post){
    //         console.error('could not find post');
    //     }
    //     if (!post.myReactions) {                    
    //         console.error('malformed post');
    //         return;
    //     }

    //     let hasReacted = post.myReactions && (post.myReactions.indexOf(reactionType) != -1);

    //     if (hasReacted) {
    //         let index = post.myReactions.indexOf(reactionType);
    //         post.myReactions.splice(index, 1);
            
    //         post.reactionCount -= 1;
    //         post[`${reactionType}ReactionCount`] -= 1;
    //         await PostController.UnreactToPost(postId, reactionType);
    //     }
    //     else {
    //         post.reactionCount += 1;
    //         post[`${reactionType}ReactionCount`] += 1;
    //         post.myReactions.push(reactionType);
    //         await PostController.ReactToPost(postId, reactionType);
    //     }

    //     this.setPosts(posts);    
    // }


    // onRequestViewPostDetail(postId) {
    //     let post = this.state.postMap[postId];
    //     if(!post)
    //     {
    //         alert('Could not find post!');
    //         return;
    //     }
        
    //     this.props.navigation.navigate('PostDetailScreen', {post});
    // }
}