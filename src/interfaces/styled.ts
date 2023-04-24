export interface ITheme {
    colors: {
        primary: string,
        fontColor: string,
        borderColor: string,
        backgroundGrey: string,
        backgroundWhite: string,
        backgroundSector1: string,
        backgroundSector2: string,

    },
    background:{
        backgroundGrey: string,
        backgroundWhite: string,
        backgroundSector1: string,
        backgroundSector2: string,
    },

    size: {
        sectorAreaWidth:{
            xs: string,
            sm: string,
            md: string,
            mdP: string,
            lg: string,
            xl: string,
        },
        sectorAreaHeight:{
            xs: string,
            sm: string,
            md: string,
            mdP: string,
            lg: string,
            xl: string,
        }
    },
    fontSize: {
        xs: string,
        sm: string,
        md: string,
        mdP: string,
        lg: string,
    },
    display: {
        none: string,
        block: string,
    }

    blockSizes: {
        header: { height: number },
        container: { width: number },
        footer: { height: number },
        modal: { width: number },
    }

    media: {
        phone: string,
        tablet: string,
    }

}