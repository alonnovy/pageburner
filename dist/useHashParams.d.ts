import { BigNumber } from "bignumber.js";
declare type GetFn<TParams extends string[]> = (name: TParams extends (infer T)[] ? T : string) => {
    toString: () => string;
    toNumber: () => number;
    toBoolean: () => boolean;
    toBigNumber: () => BigNumber;
    toDate: () => Date;
};
/**
 * Hook for use in code that needs to be reactive to changes in hash params of the url
 * @param triggers (Optional) List of hash params the hook needs to respond to (defining this list reduces unnecessary re-renders)
 * @returns an object that exposes a "get" method for retrieving the latest hash values
 */
export declare function useHashParams<T extends string[]>(...triggers: T): {
    get: GetFn<T>;
};
export {};
