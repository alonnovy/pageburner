import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Patch, RuntimePatch } from "./patch";
import * as _ from "lodash";

type RecursivePatch<TPatch> = TPatch extends Patch<any>
  ? RuntimePatch<TPatch>
  : {
      [name in keyof TPatch]: RecursivePatch<TPatch[name]>;
    };

/**
 * Prepares a patch or skin for use in UI styling by evaluating the overrides.
 * @param target
 * @returns a ready-to-use patch with all overrides fully defined
 */
export function createPatch<
  TPatch extends Patch<any> & { [key: string]: Patch<any> | any }
>(target: TPatch) {
  const result: RuntimePatch<TPatch extends Patch<infer T> ? T : void> = {
    text: (...overrides) => {
      const result = _.omit(target.text, "_overrides") || {};
      if (target.text?._overrides && overrides.length) {
        overrides.forEach((o: any) =>
          Object.assign(result, target.text!._overrides![o])
        );
      }
      return result as TextStyle;
    },
    view: (...overrides) => {
      const result = _.omit(target.view, "_overrides") || {};
      if (target.view?._overrides && overrides.length) {
        overrides.forEach((o: any) =>
          Object.assign(result, target.view!._overrides![o])
        );
      }
      return result as ViewStyle;
    },
    image: (...overrides) => {
      const result = _.omit(target.image, "_overrides") || {};
      if (target.image?._overrides && overrides.length) {
        overrides.forEach((o: any) =>
          Object.assign(result, target.image!._overrides![o])
        );
      }
      return result as ImageStyle;
    },
  };

  const customKeys = _.keys(target).filter(
    (k) => !_.includes(["view", "text", "image"], k)
  ) as (keyof TPatch)[];

  customKeys.forEach((k) => {
    if (k !== "_overrides") {
      (result as any)[k] = createPatch((target as any)[k]);
    }
  });

  return result as RuntimePatch<TPatch> & RecursivePatch<TPatch>;
}
