import React, { useInsertionEffect, useLayoutEffect } from "react";
import { useState } from "react";
import _ from "lodash";
import { useRef } from "react";
import { PageAnimation } from "./types";
import { Page } from "./page";
import { View, Text, Pressable } from "react-native";

export type PageAnimationSpec = {
  incoming?: PageAnimation | PageAnimation[];
  outgoing?: PageAnimation | PageAnimation[];
  speed?: "fast" | "medium" | "slow";
};

export type PageAnimationSpecFn = (spec: PageAnimationSpec) => {
  onDismiss: PageDismissalSpecFn;
};
export type PageDismissalSpecFn = (fn: () => void) => void;

export type PageFlow = {
  show: (page: JSX.Element) => {
    animate: PageAnimationSpecFn;
    onDismiss: PageDismissalSpecFn;
  };

  when: (predicate: boolean) => {
    show: (page: JSX.Element) => {
      animate: PageAnimationSpecFn;
      onDismiss: PageDismissalSpecFn;
    };
  };
};

export type ViewFn = (props?: RenderProps) => JSX.Element;

type PageAnnotations = {
  [key: string]: "new" | "removed" | undefined;
};

type PageDismissFunctions = {
  [key: string]: () => void;
};

export type PageAnimations = {
  [key: string]: PageAnimationSpec;
};

export type RenderProps = { width?: number | string; height?: number | string };

export function usePages(initialPages: JSX.Element | JSX.Element[] = []) {
  let priorPagesRef = useRef<JSX.Element[]>(
    _.isArray(initialPages) ? initialPages : [initialPages]
  );
  let [, setExpiredAt] = useState(0);
  let pages = _.isArray(initialPages) ? initialPages : [initialPages];
  const pageAnnotations = {} as PageAnnotations;
  const pageAnimations = useRef<PageAnimations>({}).current;
  const pageDismissFunctions = {} as PageDismissFunctions;

  const priorPages = priorPagesRef.current;

  const isPriorPage = (page: JSX.Element) =>
    !!priorPages.find((p) => p.key === page.key);

  priorPagesRef.current = [];
  const pushPage = (page: JSX.Element) => {
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
    (
      { width = "100%", height = "100%" } = { width: "100%", height: "100%" }
    ) => {
      const removedPages = priorPages.filter(
        (prior) => !pages.find((current) => current.key === prior.key)
      );
      removedPages.forEach((pg) => {
        pageAnnotations[pg.key!] = "removed";
      });

      pages = _.unionWith(pages, removedPages, (p1, p2) => p1.key === p2.key);

      return (
        <View
          key={"flow-container"}
          style={{
            overflow: "hidden",
            width,
            height,
          }}
        >
          <Text></Text>
          {pages.map((pg, idx) => (
            <View
              key={`pg-background-${pg.key}`}
              style={{
                position: "absolute",
                zIndex: idx,
                width,
                height,
                backgroundColor: idx > 0 ? "rgba(0,0,0,0.25)" : undefined,
              }}
            >
              <Pressable
                onPress={() => {
                  if (pageDismissFunctions[pg.key!]) {
                    pageDismissFunctions[pg.key!]();
                    setExpiredAt(Date.now());
                  }
                }}
                style={{ width, height }}
              >
                <Page
                  key={`pg-${pg.key}`}
                  animation={
                    pageAnnotations[pg.key!] === "new"
                      ? pageAnimations[pg.key!].incoming
                      : pageAnnotations[pg.key!] === "removed"
                      ? pageAnimations[pg.key!].outgoing
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
                  <View
                    style={{
                      width,
                      height,
                    }}
                  >
                    {pg}
                  </View>
                </Page>
              </Pressable>
            </View>
          ))}
        </View>
      );
    },
  ] as [PageFlow, ViewFn];
}
