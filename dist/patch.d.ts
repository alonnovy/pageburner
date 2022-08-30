import { ImageStyle, TextStyle, ViewStyle } from "react-native";
export declare type Patch<TOverrides extends string | void = void> = {
    view?: ViewStyle & {
        _overrides?: {
            [name in TOverrides extends string ? TOverrides : string]: ViewStyle;
        };
    };
    text?: TextStyle & {
        _overrides?: {
            [name in TOverrides extends string ? TOverrides : string]: TextStyle;
        };
    };
    image?: ImageStyle & {
        _overrides?: {
            [name in TOverrides extends string ? TOverrides : string]: ImageStyle;
        };
    };
};
