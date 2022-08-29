/// <reference types="react" />
export declare type Widget<TProps extends any | void = void> = (props: TProps) => JSX.Element | null;
export declare type ParentWidget<TProps extends any | void = void> = (props: TProps & {
    children?: JSX.Element;
}) => JSX.Element | null;
export declare type PageAnimation = "slideFromRight" | "slideToRight" | "slideFromBottom" | "slideToBottom" | "slideFromLeft" | "slideToLeft" | "slideFromTop" | "slideToTop" | "scaleUp" | "scaleDown" | "fadeIn" | "fadeOut" | "spinClockwise" | "spinCounterClockwise" | "flipUp" | "flipDown" | "none";
