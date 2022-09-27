/// <reference types="react" />
import { PageAnimation } from "./types";
export declare type PageAnimationSpec = {
    incoming?: PageAnimation | PageAnimation[];
    outgoing?: PageAnimation | PageAnimation[];
    speed?: "fast" | "medium" | "slow";
};
export declare type PageAnimationSpecFn = (spec: PageAnimationSpec) => {
    onDismiss: PageDismissalSpecFn;
};
export declare type PageDismissalSpecFn = (fn: () => void) => void;
export declare type PageFlow = {
    show: (page: JSX.Element, background?: JSX.Element) => {
        animate: PageAnimationSpecFn;
        onDismiss: PageDismissalSpecFn;
    };
    when: (predicate: boolean) => {
        show: (page: JSX.Element, background?: JSX.Element) => {
            animate: PageAnimationSpecFn;
            onDismiss: PageDismissalSpecFn;
        };
    };
};
export declare type ViewFn = () => JSX.Element;
export declare type PageAnimations = {
    [key: string]: PageAnimationSpec;
};
export declare function usePages(initialPages?: JSX.Element | JSX.Element[]): [PageFlow, ViewFn];
