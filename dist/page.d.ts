/// <reference types="react" />
import { PageAnimation } from "./types";
declare type PageProps = {
    animation?: PageAnimation | PageAnimation[];
    onAnimationFinished?: () => void;
    width: number;
    height: number;
    children: JSX.Element;
};
export declare function Page({ animation, onAnimationFinished, width, height, children, }: PageProps): JSX.Element;
export {};
