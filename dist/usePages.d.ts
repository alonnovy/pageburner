/// <reference types="react" />
import { PageAnimation } from "./types";
export declare type PageAnimationSpec = {
    incoming?: PageAnimation | PageAnimation[];
    outgoing?: PageAnimation | PageAnimation[];
    speed?: "fast" | "medium" | "slow";
};
export declare type PageAnimationSpecFn = (spec: PageAnimationSpec) => void;
export declare type PageFlow = {
    show: (page: JSX.Element) => {
        animate: PageAnimationSpecFn;
    };
    when: (predicate: boolean) => {
        show: (page: JSX.Element) => {
            animate: PageAnimationSpecFn;
        };
    };
};
export declare type ViewFn = (props?: RenderProps) => JSX.Element;
export declare type PageAnimations = {
    [key: string]: PageAnimationSpec;
};
export declare type RenderProps = {
    width?: number | string;
    height?: number | string;
};
export declare function usePages(initialPages?: JSX.Element | JSX.Element[]): [PageFlow, ViewFn];
