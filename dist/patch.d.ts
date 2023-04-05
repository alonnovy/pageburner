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
export declare type RuntimePatch<TPatch extends Patch<any> | any | void = void> = {
    view: (...overrides: (TPatch extends Patch<infer T> ? T : void)[]) => ViewStyle;
    text: (...overrides: (TPatch extends Patch<infer T> ? T : void)[]) => TextStyle;
    image: (...overrides: (TPatch extends Patch<infer T> ? T : void)[]) => ImageStyle;
} & {
    [name in keyof TPatch]: RuntimePatch<TPatch[name]>;
};
export {};
