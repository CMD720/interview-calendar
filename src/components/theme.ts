import {ITheme , ThemeEnum} from "../interfaces/styled";
import {DefaultTheme} from "styled-components";
export const theme = {
    colors:{
        primary:'#ff3131',
        secondary:'#99DDEFFF',
    },
    display:{
        none: 'none',
        block: 'block'
    }
}


export const baseTheme:ITheme = {
    colors: {
        primary: '#ff3131',
        secondary: '#99DDEFFF',
        success: '#4caf50',
        danger: '#f44336 ',

        bg: '#E5E4E8',
        font: '#19191B',
    },
    display:{
        none: 'none',
        block: 'block'
    },
    media: {
        extraLarge: '(max-width: 1140px)',
        large: '(max-width: 960px)',
        medium: '(max-width: 720px)',
        small: '(max-width: 540px)',
    },

    // in px
    sizes: {
        header: { height: 56 },
        container: { width: 1200 },
        footer: { height: 128 },
        modal: { width: 540 },
    },

    // in ms
    durations: {
        ms300: 300,
    },

    // z-index
    order: {
        header: 50,
        modal: 100,
    },
}

export const lightTheme: DefaultTheme = {
    ...baseTheme,
    type: ThemeEnum.light,

    colors: {
        ...baseTheme.colors,
        bg: '#E5E4E8',
        font: '#19191B',
    },
}

export const darkTheme: DefaultTheme = {
    ...baseTheme,
    type: ThemeEnum.dark,

    colors: {
        ...baseTheme.colors,
        bg: '#19191B',
        font: '#E5E4E8',
    },
}