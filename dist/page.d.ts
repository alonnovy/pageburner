/// <reference types="react" />
import { PageAnimation, PageAnimationSpeed } from "./types";
declare type PageProps = {
    animation?: PageAnimation | PageAnimation[];
    animationSpeed?: PageAnimationSpeed;
    onAnimationFinished?: () => void;
    width: number;
    height: number;
    children: JSX.Element;
};
export declare function Page({ animation, animationSpeed, onAnimationFinished, width, height, children, }: PageProps): JSX.Element;
export {};
