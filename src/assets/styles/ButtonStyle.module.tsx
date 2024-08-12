import { StyleSheet } from "react-native";
import { inpHPrimary, inpWPrimary, radSecondary } from "../../constants/sizes";

const ButtonPrimaryStyle = StyleSheet.create({
    container: {
        zIndex: 999,
        borderWidth: 1,
        width: inpWPrimary,
        height: inpHPrimary,
        borderColor: '#000000',
        justifyContent: 'center',
        borderRadius: radSecondary,
    },
    title: {
        color: 'black',
        textAlign: 'center'
    },
})

const ButtonSecondaryStyle = StyleSheet.create({
    container: {
        zIndex: 999,
        borderWidth: 1,
        width: 103,
        height: 40,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radSecondary,
    },
    title: {
        width: 50,
        height: 24,
        color: 'black',
        textAlign: 'center'
    },
})

export {
    ButtonPrimaryStyle,
    ButtonSecondaryStyle
}