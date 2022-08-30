/// <reference types="react" />
export declare type Widget<TProps extends any | void = {}> = (props: TProps) => JSX.Element | null;
export declare type ParentWidget<TProps extends any | void = {}> = (props: TProps & {
    children?: JSX.Element;
}) => JSX.Element | null;
export declare type PageAnimation = "slideFromRight" | "slideToRight" | "slideFromBottom" | "slideToBottom" | "slideFromLeft" | "slideToLeft" | "slideFromTop" | "slideToTop" | "scaleUp" | "scaleDown" | "fadeIn" | "fadeOut" | "spinClockwise" | "spinCounterClockwise" | "flipUp" | "flipDown" | "none";
export declare type PageAnimationSpeed = "fast" | "medium" | "slow";
