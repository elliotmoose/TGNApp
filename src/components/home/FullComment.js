import React from 'react';
import { Text, View, Image } from 'react-native';
import ImageLoader from '../../api/ImageLoader';
import Colors from '../../constants/Colors';
import { RelativeDate } from '../../helpers/DateHelper';

export default function FullComment ({comment, style}) {
    let {content, user} = comment;

    const commentFontSize = 12;
    return <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.offWhite, ...style}}>
        <Image source={{uri: ImageLoader.LoadProfilePicture(user.username)}} style={{width: 30, borderRadius: 15, aspectRatio: 1, backgroundColor: Colors.bgGray, marginRight: 10, alignSelf: 'flex-start'}}/>
        <View style={{flexDirection: 'column'}}>
            <Text style={{ fontSize: commentFontSize }}>
                <Text style={{ fontWeight: 'bold' }}>{user.username} </Text>
                {content}
            </Text>
            <Text style={{color: Colors.darkGray, fontSize: 12, marginTop: 4}}>
                {RelativeDate(comment.datePosted)}
            </Text>
        </View>
    </View>
}