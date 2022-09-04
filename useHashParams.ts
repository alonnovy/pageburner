import { useState } from "react";
import _ from "lodash";
import { BigNumber } from "bignumber.js";
import { Platform } from "react-native";

type GetFn<TParams extends string[]> = (
  name: TParams extends (infer T)[] ? T : string
) => {
  toString: () => string;
  toNumber: () => number;
  toBoolean: () => boolean;
  toBigNumber: () => BigNumber;
  toDate: () => Date;
};

type SetFn<TParams extends string[]> = (
  name: TParams extends (infer T)[] ? T : string,
  value: any
) => void;

function hashToObject(hash: string) {
  let result = {} as any;
  decodeURIComponent(hash)
    .substring(1)
    .split("&")
    .forEach((pair) => {
      if (pair.includes("=")) {
        const [key, value] = pair.split("=");
        result[key] = value;
        return result;
      } else if (pair) {
        return (result[pair] = "");
      }
    });

  return result;
}

function objectToHash<T extends object>(obj: T) {
  return _.keys(obj)
    .map((k) => `${k}=${(obj as any)[k].toString()}`)
    .join("&");
}

function createGetFunction<TParams extends string[]>(
  url: URL,
  params: TParams
) {
  let result = _.pick(hashToObject(url.hash), params);

  return <TName extends TParams extends (infer T)[] ? T : string>(
    name: TName
  ) => {
    const value = result[name];

    return {
      toString: () => value,
      toNumber: () => new Number(value).valueOf(),
      toBoolean: () => new Boolean(value).valueOf(),
      toBigNumber: () => new BigNumber(value),
      toDate: () => new Date(value),
    };
  };
}

function hadParamChange<TParams extends string[]>(
  oldUrl: URL,
  newUrl: URL,
  params: TParams
) {
  const oldValues = hashToObject(oldUrl.hash);
  const newValues = hashToObject(newUrl.hash);
  if (params.length) {
    return _.find(params, (p) => oldValues[p] !== newValues[p]);
  } else {
    return true;
  }
}

/**
 * Hook for use in code that needs to be reactive to changes in hash params of the url
 * @param triggers (Optional) List of hash params the hook needs to respond to (defining this list reduces unnecessary re-renders)
 * @returns an object that exposes a "get" method for retrieving the latest hash values
 */
export function useHashParams<T extends string[]>(
  ...triggers: T
): [GetFn<T>, SetFn<T>] {
  if (Platform.OS !== "web") {
    throw new Error("useHashParams is only supported on web platform");
  }

  const [params, setParams] = useState<{ get: GetFn<T> }>();
  const [wiredUp, setWiredUp] = useState(false);

  if (!wiredUp) {
    window.addEventListener("hashchange", (ev) => {
      if (hadParamChange(new URL(ev.oldURL), new URL(ev.newURL), triggers)) {
        const result = createGetFunction<T>(new URL(ev.newURL), triggers);
        setParams({ get: result });
      }
    });
    setWiredUp(true);
  }

  const getFn =
    params?.get || createGetFunction(new URL(window.location.href), triggers);

  const setFn: SetFn<T> = (name, value) => {
    const url = new URL(window.location.href);
    const hashObject = hashToObject(url.hash);
    hashObject[name] = value;
    window.location.hash = objectToHash(hashObject);
  };

  return [getFn, setFn];
}
