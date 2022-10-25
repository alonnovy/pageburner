export type Widget<TProps extends any | void = {}> = (
  props: TProps
) => JSX.Element | null;

export type ParentWidget<TProps extends any | void = {}> = (
  props: TProps & {
    children?: React.ReactNode;
  }
) => JSX.Element | null;

export type PageAnimation =
  | "slideFromRight"
  | "slideToRight"
  | "slideFromBottom"
  | "slideToBottom"
  | "slideFromLeft"
  | "slideToLeft"
  | "slideFromTop"
  | "slideToTop"
  | "scaleUp"
  | "scaleDown"
  | "fadeIn"
  | "fadeOut"
  | "spinClockwise"
  | "spinCounterClockwise"
  | "flipUp"
  | "flipDown"
  | "none";

export type PageAnimationSpeed = "fast" | "medium" | "slow";
