export type FlowEvent<T> = T extends [infer K, infer D]
  ? { type: K; data: D }
  : { type: T };
