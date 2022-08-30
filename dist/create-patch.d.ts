import { Patch } from "./patch";
export declare function createPatch<TOverrides extends string | void, TPatch extends Patch<TOverrides> & {
    [key: string]: any;
}>(target: TPatch): TPatch;
