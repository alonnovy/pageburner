import _ from "lodash";
import { Platform, ScaledSize, useWindowDimensions } from "react-native";

type ScreenPropertyOptions = {
  /** Maximum screen height up to which the screen is to be considered "short" */
  shortHeight?: number;

  /** Minimum screen height from which the screen is to be considered "tall" */
  tallHeight?: number;

  /** Maximum screen width up to which the screen is to be considered "narrow" */
  narrowWidth?: number;

  /** Maximum screen width from which the screen is to be considered "width" */
  wideWidth?: number;
};

export type ScreenProperties = ScaledSize & {
  isShort: boolean;
  isTall: boolean;
  isNarrow: boolean;
  isWide: boolean;
};

const defaultScreenPropertyOptions = {
  throttlePeriod: 100,
  shortHeight: 600,
  narrowWidth: _.includes(["ios", "android"], Platform.OS) ? 600 : 500,
  tallHeight: 1000,
  wideWidth: 1400,
} as ScreenPropertyOptions;

/** Hook for use in functions that need to be reactive to screen properties (e.g., dimensions, scaling etc)  */
export function useScreenProperties(options: ScreenPropertyOptions = {}) {
  const windowDimensions = useWindowDimensions();
  const opt = Object.assign({}, defaultScreenPropertyOptions, options);

  return Object.assign({}, windowDimensions, {
    isShort: windowDimensions.height <= opt.shortHeight!,
    isTall: windowDimensions.height >= opt.tallHeight!,
    isNarrow: windowDimensions.width <= opt.narrowWidth!,
    isWide: windowDimensions.width >= opt.wideWidth!,
  }) as ScreenProperties;
}
