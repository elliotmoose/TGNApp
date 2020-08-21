const reactionCountKeyPrefixes = ['love', 'like', 'pray', 'praise'];

const PostHelper = {
    GetMaxReactionTypeFromPost(post) {
        if(!post)
        {
            return null;
        }

        let maxReactionType = null;
        let maxReactionCount = 0;
        let totalReactionCount = 0;

        for(let reaction of reactionCountKeyPrefixes)
        {
            let key = reaction + 'ReactionCount';
            let reactionCount = post[key];
            totalReactionCount += reactionCount;
            if(reactionCount > maxReactionCount &&  reactionCount != 0)
            {
                maxReactionCount = reactionCount;
                maxReactionType = reaction;
            }
        }

        return maxReactionType;
    }
}
export default PostHelper;