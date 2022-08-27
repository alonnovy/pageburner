import { ScaledSize } from "react-native";
declare type ScreenPropertyOptions = {
    /** Maximum screen height up to which the screen is to be considered "short" */
    shortHeight?: number;
    /** Minimum screen height from which the screen is to be considered "tall" */
    tallHeight?: number;
    /** Maximum screen width up to which the screen is to be considered "narrow" */
    narrowWidth?: number;
    /** Maximum screen width from which the screen is to be considered "width" */
    wideWidth?: number;
};
export declare type ScreenProperties = ScaledSize & {
    isShort: boolean;
    isTall: boolean;
    isNarrow: boolean;
    isWide: boolean;
};
/** Hook for use in functions that need to be reactive to screen properties (e.g., dimensions, scaling etc)  */
export declare function useScreenProperties(options?: ScreenPropertyOptions): ScreenProperties;
export {};
