export declare type FlowEvent<T extends string, D extends Object | void = void> = D extends void ? T : Record<T, D>;
