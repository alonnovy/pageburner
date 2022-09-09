import { Patch } from "./patch";
/**
 * Prepares a patch or skin for use in UI styling by evaluating the overrides.
 * @param target
 * @returns a ready-to-use patch with all overrides fully defined
 */
export declare function createPatch<TPatch extends Patch<any> & {
    [key: string]: Patch<any> | any;
}>(target: TPatch): TPatch;
