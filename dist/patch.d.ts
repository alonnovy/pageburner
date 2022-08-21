import { ImageStyle, TextStyle, ViewStyle } from "react-native";
export declare type Patch<TOverrides extends string | void = void> = {
    view?: ViewStyle & {
        _overrides?: TOverrides extends string ? {
            [name in TOverrides]: ViewStyle;
        } : undefined;
    };
    text?: TextStyle & {
        _overrides?: TOverrides extends string ? {
            [name in TOverrides]: TextStyle;
        } : undefined;
    };
    image?: ImageStyle & {
        _overrides?: TOverrides extends string ? {
            [name in TOverrides]: ImageStyle;
        } : undefined;
    };
};
