import { bindAll } from "lodash";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type Patch<TOverrides extends string | void = void> = {
  view?: ViewPatch<TOverrides>;
  text?: TextPatch<TOverrides>;
  image?: ImagePatch<TOverrides>;
};

type ViewPatch<TOverrides extends string | void = void> = ViewStyle & {
  _overrides?: Partial<{
    [name in TOverrides extends string ? TOverrides : string]: ViewStyle;
  }> & {
    /** Merging occurs in the order specified, that is, in case styles conflict, later styles override earlier styles. */
    merge?: (...names: TOverrides[]) => ViewStyle;
  };
};

type TextPatch<TOverrides extends string | void = void> = TextStyle & {
  _overrides?: Partial<{
    [name in TOverrides extends string ? TOverrides : string]: TextStyle;
  }>;
} & {
  /** Merging occurs in the order specified, that is, in case styles conflict, later styles override earlier styles. */
  merge?: (...names: TOverrides[]) => TextStyle;
};

type ImagePatch<TOverrides extends string | void = void> = ImageStyle & {
  _overrides?: Partial<{
    [name in TOverrides extends string ? TOverrides : string]: ImageStyle;
  }> & {
    /** Overriding occurs in the order specified, that is, in case styles conflict, later styles override earlier styles. */
    merge?: (...names: TOverrides[]) => ImageStyle;
  };
};
