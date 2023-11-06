import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import COLORS from '../constants/colors'

const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.secondary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, alignSelf: 'center' ,... { color: textColor }, }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button