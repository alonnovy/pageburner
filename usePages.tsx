import React from "react";
import { useState } from "react";
import _ from "lodash";
import { useRef } from "react";
import { PageAnimation } from "./types";
import { Page } from "./page";
import { View, Pressable } from "react-native";

export type PageAnimationSpec = {
  incoming?: PageAnimation | PageAnimation[];
  outgoing?: PageAnimation | PageAnimation[];
  speed?: "fast" | "medium" | "slow";
};

export type PageAnimationSpecFn = (spec: PageAnimationSpec) => {
  onDismiss: PageDismissalSpecFn;
};
export type PageDismissalSpecFn = (fn: () => void) => void;

export type ShowOptions = {
  background?: JSX.Element | null;
};

export type PageFlow = {
  show: (
    page: JSX.Element | (() => JSX.Element),
    options?: ShowOptions
  ) => {
    animate: PageAnimationSpecFn;
    onDismiss: PageDismissalSpecFn;
  };

  when: (predicate: boolean) => {
    show: (
      page: JSX.Element | (() => JSX.Element),
      options?: ShowOptions
    ) => {
      animate: PageAnimationSpecFn;
      onDismiss: PageDismissalSpecFn;
    };
  };
};

type RenderProps = {
  zIndex?: number;
};

export type RenderFn = (props?: RenderProps) => JSX.Element;

type PageAnnotations = {
  [key: string]: "new" | "removed" | undefined;
};

type PageDismissFunctions = {
  [key: string]: () => void;
};

export type PageAnimations = {
  [key: string]: PageAnimationSpec;
};

type PageOptions = {
  [key: string]: ShowOptions;
};

export const DefaultBackground = (
  <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)" }}></View>
);

export function usePages(initialPages: JSX.Element | JSX.Element[] = []) {
  const initialPagesArray = _.isArray(initialPages)
    ? initialPages
    : [initialPages];

  let pages = initialPagesArray;

  let priorPagesRef = useRef<JSX.Element[]>(initialPagesArray);
  let [, setExpiredAt] = useState(0);
  const pageAnimations = useRef<PageAnimations>({}).current;
  const pageAnnotations = {} as PageAnnotations;
  const pageDismissFunctions = {} as PageDismissFunctions;
  const pageOptions = {} as PageOptions;

  const priorPages = priorPagesRef.current;

  const isPriorPage = (page: JSX.Element) =>
    !!priorPages.find((p) => p.key === page.key);

  priorPagesRef.current = [];

  const pushPage = (
    pg: JSX.Element | (() => JSX.Element),
    options?: ShowOptions
  ) => {
    const page = typeof pg === "function" ? pg() : pg;

    if (page.key === undefined || page.key === null) {
      throw new Error("Undefined or null page key");
    }

    if (!isPriorPage(page)) {
      pageAnnotations[page.key!] = "new";
    }
    pageAnimations[page.key!] = {
      incoming: ["slideFromRight"],
      outgoing: ["slideToRight"],
      speed: "fast",
    };
    pageOptions[page.key!] = options || {};

    !!options?.background && pages.push(options?.background);
    pages.push(page);

    const onDismiss = ((fn) => {
      pageDismissFunctions[page.key!] = fn;
    }) as PageDismissalSpecFn;

    const animate = (({
      incoming = "slideFromRight",
      outgoing = "slideToRight",
      speed = "fast",
    }: PageAnimationSpec) => {
      pageAnimations[page.key!] = {
        incoming: _.isArray(incoming) ? incoming : [incoming],
        outgoing: _.isArray(outgoing) ? outgoing : [outgoing],
        speed,
      };
      return {
        onDismiss,
      };
    }) as PageAnimationSpecFn;

    return { animate, onDismiss };
  };

  return [
    /** pages */
    {
      show: pushPage,
      when: (predicate) => {
        if (predicate) {
          return {
            show: pushPage,
          };
        } else {
          return {
            show: () => {
              return {
                animate: (spec: PageAnimationSpec) => {
                  return {
                    onDismiss: (onDismissed: () => void) => {},
                  };
                },
                onDismiss: (onDismissed: () => void) => {},
              };
            },
          };
        }
      },
    } as PageFlow,

    /** render */
    ({ zIndex }: { zIndex?: number } = {}) => {
      const removedPages = priorPages.filter(
        (prior) => !pages.find((current) => current.key === prior.key)
      );
      removedPages.forEach((pg) => {
        pageAnnotations[pg.key!] = "removed";
      });

      pages = _.unionWith(pages, removedPages, (p1, p2) => p1.key === p2.key);

      return (
        <>
          {!!pages.length && (
            <View
              key={"flow-container"}
              style={{
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex,
              }}
            >
              {pages.map((pg, idx) => (
                <View
                  key={`pg-background-${pg.key}`}
                  style={{
                    position: "absolute",
                    zIndex: idx,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Page
                    key={`pg-${pg.key}`}
                    animation={
                      pageAnnotations[pg.key!] === "new"
                        ? pageAnimations[pg.key!]?.incoming
                        : pageAnnotations[pg.key!] === "removed"
                        ? pageAnimations[pg.key!]?.outgoing
                        : "none"
                    }
                    animationSpeed={pageAnimations[pg.key!]?.speed}
                    onAnimationFinished={() => {
                      if (pageAnnotations[pg.key!] !== "removed") {
                        priorPagesRef.current.push(pg);
                      } else {
                        setTimeout(() => {
                          setExpiredAt(Date.now());
                        }, 1);
                      }
                    }}
                  >
                    <>
                      <Pressable
                        key={`pg-dismiss-${idx}`}
                        onPress={(ev) => {
                          if (pageDismissFunctions[pg.key!]) {
                            pageDismissFunctions[pg.key!]();
                            setExpiredAt(Date.now());
                          }
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        }}
                      />
                      {pg}
                    </>
                  </Page>
                </View>
              ))}
            </View>
          )}
        </>
      );
    },
  ] as [PageFlow, RenderFn];
}
