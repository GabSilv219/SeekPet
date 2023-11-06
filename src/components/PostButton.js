import { Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

const PostButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
          <Text style={{ fontWeight: "500"}}>{props.title}</Text>
        </TouchableOpacity>
    )
};

export default PostButton;