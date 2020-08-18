import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../helpers/Images';
import moment from 'moment';

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

        let username = post.user.username;
        let postType = post.type;
        let postTarget = post.target.handle;
        // let postTime = post.dateCreated
        let isPastADay = Date.now() - post.dateCreated > 35*60*60*1000;
        
        let postTime = isPastADay ? moment(post.dateCreated).format("DD MMM YYYY") : moment(post.dateCreated).fromNow();
        
        let timeSince = post.dateCreated
        // let postTime = '5 hours ago';


        return <View style={{flexDirection: 'row', height: 50}}>
            <Image style={{backgroundColor: Colors.darkGray, height: '100%', aspectRatio: 1, borderRadius: 100}} source={null}/>
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
    
    postReactions(myReactions) {                
        return <View style={{marginTop: 24, flexDirection: 'row', height: 34}}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', height: 16, alignSelf: 'flex-end'}}>           
                <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                    <Image source={Images.reactionLove} style={{height: 16, width: 16}} resizeMode='contain'/>     
                    <Text style={{fontSize: 12, fontWeight: '200', marginLeft: 4}}>130 Reactions • 54 Comments</Text>
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
    render() {
        // let post = this.props;        
        let post = {
            user: {
                username: "mooselliot",
                profilePicture: 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/64653383_10212685679891511_3318642605947879424_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=AcCAq9A6FpMAX_pBWuI&_nc_ht=scontent.fsin8-2.fna&oh=e1159ea8dd38e270a22a9db979617b06&oe=5F62C59B'
            },
            type: "Testimony",
            target: {
                handle: 'bethelaog',
                name: 'Bethel Aog'
            },
            content: 'Hi everyone!! Nice to meet all of you I\'m excited for our event this friday. Looking forward to see everyone else there!',
            reactionCount: 130,
            commentCount: 52,
            myReactions: ["love", "pray"],
            peekComments: [{
                user: {
                    username: 'llpofwy',
                    profilePicture: 'https'
                }
            }],
            dateCreated: new Date(Date.now() - 60*60*1000*36),            
        }

        // let content = 'Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit Neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi A condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna phasellus vestibulum lorem sed risus ultricies tristique.';

        return (
            <View style={{backgroundColor: 'white', marginBottom: 20, padding: 16}} {...this.props.style}>
                {this.postHeader(post)}                
                {this.postContent(post.content)}
                {this.postReactions(post.myReactions)}                
                {this.postComments()}
            </View>
        );
    }
}

export default Post;
