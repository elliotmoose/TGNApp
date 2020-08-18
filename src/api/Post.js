import Network from '../helpers/Network';

export const PostController = {
    async GetFeed() {
        try {
            let response = await Network.JsonRequest('GET','/feed');
            return response;
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }        
    },
    async GetPost(postId) {

        try {
            let response = await Network.JsonRequest('GET',`/post/${postId}`);
            return response;
        } catch (error) {
            console.log('TODO: HANDLE ERROR:');
            console.log(error);
        }        
    }
}