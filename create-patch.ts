import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Patch } from "./patch";
import * as _ from "lodash";

function resolveOverrides<TStyle extends ViewStyle | TextStyle | ImageStyle>(
  styleDefault: TStyle,
  overrides: TStyle
) {
  const result = _.omit(styleDefault, ["_overrides"]);
  return Object.assign(result, overrides);
}

export function createPatch<
  TOverrides extends string | void,
  TPatch extends Patch<TOverrides> & { [key: string]: any }
>(target: TPatch) {
  let result = _.clone(target);

  if (result.image) {
    for (let k in result.image!._overrides) {
      result.image!._overrides[k] = resolveOverrides(
        result.image!,
        result.image!._overrides[k]!
      ) as any;
    }
  }

  if (result.text) {
    for (let k in result.text!._overrides) {
      result.text!._overrides[k] = resolveOverrides(
        result.text!,
        result.text!._overrides[k]!
      ) as any;
    }
  }

  if (result.view) {
    for (let k in result.view!._overrides) {
      result.view!._overrides[k] = resolveOverrides(
        result.view!,
        result.view!._overrides[k]!
      ) as any;
    }
  }

  const customKeys = _.keys(result).filter(
    (k) => !_.includes(["view", "text", "image"], k)
  ) as (keyof TPatch)[];

  customKeys.forEach((k) => {
    result[k] = createPatch(result[k]);
  });

  return result;
}
