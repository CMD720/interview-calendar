import {ITheme} from "../interfaces/styled";

export const theme: ITheme = {
    colors:{
        primary:'#ff3131',
        fontColor:'black',
        borderColor: '#e6e6e6',
        backgroundGrey: '#f6f6f6',
        backgroundWhite: '#ffff',
        backgroundSector1: '#b3b7ff',
        backgroundSector2: '#ebecff',

    },
    background:{
        backgroundGrey: '#f6f6f6',
        backgroundWhite: '#ffff',
        backgroundSector1: '#b3b7ff',
        backgroundSector2: '#ebecff',
    },
    display:{
        none: 'none',
        block: 'block'
    },
    size:{
        sectorAreaWidth:{
            xs : '20px',
            sm : '25px',
            md : '30px',
            mdP: '35px',
            lg : '40px',
            xl : '50px',
        },
        sectorAreaHeight:{
            xs : '20px',
            sm : '25px',
            md : '30px',
            mdP: '35px',
            lg : '40px',
            xl : '50px',
        }
    },
    fontSize:{
        xs : '0.5em',
        sm : '1.3em',
        md : '1.5em',
        mdP : '1.8em',
        lg : '2em',
    },
    blockSizes: {
        header: { height: 0 },
        container: { width: 0 },
        footer: { height: 0 },
        modal: { width: 0 },
    },
    media: {
        phone: "(max-width: 425px)",
        tablet: "(max-width: 768px) and (min-width:425px )",
    }
}

