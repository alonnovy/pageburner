import { ImageStyle, TextStyle, ViewStyle } from "react-native";
export declare type Patch<TOverrides extends string | void = void> = {
    view?: ViewPatch<TOverrides>;
    text?: TextPatch<TOverrides>;
    image?: ImagePatch<TOverrides>;
};
declare type ViewPatch<TOverrides extends string | void = void> = ViewStyle & {
    _overrides?: Partial<{
        [name in TOverrides extends string ? TOverrides : string]: ViewStyle;
    }> & {
        /** Merging occurs in the order specified, that is, in case styles conflict, later styles override earlier styles. */
        merge?: (...names: TOverrides[]) => ViewStyle;
    };
};
declare type TextPatch<TOverrides extends string | void = void> = TextStyle & {
    _overrides?: Partial<{
        [name in TOverrides extends string ? TOverrides : string]: TextStyle;
    }>;
} & {
    /** Merging occurs in the order specified, that is, in case styles conflict, later styles override earlier styles. */
    merge?: (...names: TOverrides[]) => TextStyle;
};
declare type ImagePatch<TOverrides extends string | void = void> = ImageStyle & {
    _overrides?: Partial<{
        [name in TOverrides extends string ? TOverrides : string]: ImageStyle;
    }> & {
        /** Overriding occurs in the order specified, that is, in case styles conflict, later styles override earlier styles. */
        merge?: (...names: TOverrides[]) => ImageStyle;
    };
};
declare type StyleMethod<TStyle extends ViewStyle | TextStyle | ImageStyle, TPatch extends Patch<any> | any | void = void> = TPatch extends Patch<string> ? (...overrides: (TPatch extends Patch<infer T> ? T : void)[]) => TStyle : () => TStyle;
export declare type RuntimePatch<TPatch extends Patch<any> | any | void = void> = {
    view: StyleMethod<ViewStyle, TPatch>;
    text: StyleMethod<TextStyle, TPatch>;
    image: StyleMethod<ImageStyle, TPatch>;
} & {
    [name in keyof TPatch]: RuntimePatch<TPatch[name]>;
};
export {};
