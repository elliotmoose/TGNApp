import React from 'react';
import { Text, View } from 'react-native';

export default function Comment ({comment}) {
    let {content, user} = comment;

    const commentFontSize = 12;
    return <View style={{ flexDirection: 'row', marginTop: 6, marginHorizontal: 4 }}>
        <Text style={{ fontSize: commentFontSize }}>
            <Text style={{ fontWeight: 'bold' }}>{user.username} </Text>
            {content}
        </Text>
    </View>
}