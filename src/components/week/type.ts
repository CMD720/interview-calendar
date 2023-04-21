import {ReactElement} from "react";

export enum FontSize {
    xs = '0.5em',
    sm = '1em',
    md = '1.5em',
    lg = '2em',
}
export type SectorProps = {
    fontSize?: FontSize;
    children?: string | number | ReactElement; //если убрать ошибки нет, всё работает. почему?
}
