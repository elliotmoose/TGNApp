import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../helpers/Images';
import moment from 'moment';
import { PostController } from '../../api/Post';

class Post extends Component {
    reactToPost(reactionType) {
        console.log(reactionType);
    }

    postTag(tagName) {
        return <View style={{backgroundColor: Colors.blue, borderRadius: 100, justifyContent: 'center', alignItems: 'center', padding: 2, paddingHorizontal: 10, alignSelf: 'flex-start'}}>
            <Text style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>{tagName}</Text>
        </View>
    }
    postHeader(post) {
        
        let username = (post.user && post.user.username) || 'unknown_user' ;
        let profilePicture = (post.user && post.user.profilePicture) || null;
        let postType = post.postType || 'no_post_type';
        let postTarget = post.target && post.target.handle;
        let isPastADay = post.datePosted ? (Date.now() - post.datePosted > 35*60*60*1000) : false;
        let postTime = post.datePosted ? (isPastADay ? moment(post.datePosted).format("DD MMM YYYY") : moment(post.datePosted).fromNow()) : '';

        return <View style={{flexDirection: 'row', height: 50}}>
            <Image style={{backgroundColor: Colors.darkGray, height: '100%', aspectRatio: 1, borderRadius: 100}} source={{uri: profilePicture}}/>
            <View style={{flexDirection: 'column', height: '100%', justifyContent: 'space-between', marginLeft: 9, padding: 4, flex: 1}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{username}</Text>
                <View style={{width: '100%'}}>
                    {this.postTag(postType)}
                </View>
            </View>
            <View style={{flexDirection: 'column', height: '100%', justifyContent: 'center', marginLeft: 9, padding: 4}}>
                {postTarget && <Text style={{fontSize: 15, fontWeight: '200', alignSelf: 'flex-end', marginBottom: 3}}>@{postTarget}</Text>}
                <Text style={{fontSize: 12, fontWeight: '200', alignSelf: 'flex-end'}}>{postTime}</Text>    
            </View>
        </View>;
    }

    postContent(content) {
        return <View style={{marginTop: 12}}>
            <Text style={{fontWeight: '400'}}>{content}</Text>
        </View>
    }
    
    postReactions(post) {                
        let myReactions = post.myReactions || [];
        let reactionCount = post.reactionCount || 0;
        let reactionCountSuffix = reactionCount == 1 ? '' : 's';
        let commentCount = post.commentCount || 0;
        let commentCountSuffix = commentCount == 1 ? '' : 's';
        
        let mostReacted = reactionCount == 0 ? null : (`reaction${post.maxReactionType[0].toUpperCase() + post.maxReactionType.substring(1)}`);

        return <View style={{marginTop: 24, flexDirection: 'row', height: 34}}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', height: 16, alignSelf: 'flex-end'}}>           
                <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                    {mostReacted && <Image source={Images[mostReacted]} style={{height: 16, width: 16}} resizeMode='contain'/>}
                    <Text style={{fontSize: 12, fontWeight: '200', marginLeft: 4, marginTop: 3}}>{reactionCount} Reaction{reactionCountSuffix} • {commentCount} Comment{commentCountSuffix}</Text>
                </View>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            {
                ["love", "like", "pray", "praise"].map((key, index)=>{
                    let hasReacted = (myReactions.indexOf(key) != -1);

                    let imageTitle = `reaction${key[0].toUpperCase() + key.substring(1)}`;
                    return <TouchableOpacity key={index} style={{height: '100%', aspectRatio: 1, marginLeft: 4}} onPress={()=>{
                        this.reactToPost(key);
                    }}>           
                        <Image source={Images[imageTitle]} style={{height: '100%', aspectRatio: 1,
                        tintColor: hasReacted ? null : 'gray',
                        opacity: hasReacted ? 1 : 0.2,
                        }} resizeMode='contain'/>     
                    </TouchableOpacity>
                })
            }
        </View>
    }

    postComments() {
        return <View/>
    }

    constructor(props) {
        super(props);
        this.state = {
            post : {
        
            }
        }
    }

    // async componentDidMount() {
    //     let { post } = this.props;                
    //     // let post = await PostController.GetFeedPost(postId);
    //     this.setState({post});
    // }

    render() {
        let post = this.props.post || {};                
        // let content = 'Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit Neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi A condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna phasellus vestibulum lorem sed risus ultricies tristique.';

        return (
            <View style={{backgroundColor: 'white', marginBottom: 20, padding: 16}} {...this.props.style}>
                {this.postHeader(post)}                
                {this.postContent(post.content)}
                {this.postReactions(post)}                
                {this.postComments()}
            </View>
        );
    }
}

export default Post;
