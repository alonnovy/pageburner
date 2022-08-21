export type Widget<TProps extends any | void> = (props: TProps) => JSX.Element;

export type ParentWidget<TProps> = (
  props: TProps & { children?: JSX.Element }
) => JSX.Element;

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
