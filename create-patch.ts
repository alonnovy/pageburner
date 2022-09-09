import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Patch } from "./patch";
import * as _ from "lodash";

/**
 * Prepares a patch or skin for use in UI styling by evaluating the overrides.
 * @param target
 * @returns a ready-to-use patch with all overrides fully defined
 */
export function createPatch<
  TPatch extends Patch<any> & { [key: string]: Patch<any> | any }
>(target: TPatch): TPatch {
  let result = _.clone(target);

  if (result.image) {
    resolveStyle(result.image);
  }

  if (result.text) {
    resolveStyle(result.text);
  }

  if (result.view) {
    resolveStyle(result.view);
  }

  const customKeys = _.keys(result).filter(
    (k) => !_.includes(["view", "text", "image"], k)
  ) as (keyof TPatch)[];

  customKeys.forEach((k) => {
    (result as any)[k] = createPatch((result as any)[k]);
  });

  return result;
}

function resolveStyle<
  TStyle extends (ViewStyle | TextStyle | ImageStyle) & { _overrides?: any }
>(style: TStyle) {
  for (let k in style._overrides) {
    style._overrides[k] = resolveOverrides(style, style._overrides[k]!);
  }

  if (style._overrides) {
    style._overrides!.merge = (...names: string[]) => {
      return resolveOverrides(
        style,
        names.map((n) => style._overrides![n]!)
      );
    };
  }
}

function resolveOverrides<TStyle extends ViewStyle | TextStyle | ImageStyle>(
  styleDefault: TStyle,
  overrides: TStyle[]
) {
  const result = _.omit(styleDefault, ["_overrides"]);

  if (overrides === undefined) {
    return result;
  }

  if (_.isArray(overrides)) {
    return Object.assign(result, ...overrides);
  }

  return Object.assign(result, overrides);
}
