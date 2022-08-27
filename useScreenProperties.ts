import { useState } from "react";
import _ from "lodash";
import { ScaledSize, useWindowDimensions } from "react-native";

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
  narrowWidth: 800,
  tallHeight: 1000,
  wideWidth: 1400,
} as ScreenPropertyOptions;

/** Hook for use in functions that need to be reactive to screen properties (e.g., dimensions, scaling etc)  */
export function useScreenProperties(options: ScreenPropertyOptions = {}) {
  const windowDimensions = useWindowDimensions();
  const opt = Object.assign({}, defaultScreenPropertyOptions, options);

  return Object.assign({}, windowDimensions, {
    isShort: window.innerHeight <= opt.shortHeight!,
    isTall: window.innerHeight >= opt.tallHeight!,
    isNarrow: window.innerWidth <= opt.narrowWidth!,
    isWide: window.innerWidth >= opt.wideWidth!,
  }) as ScreenProperties;
}
