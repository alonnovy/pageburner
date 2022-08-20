import React from "react";
import { useState } from "react";
import _ from "lodash";
import { useRef } from "react";
import { PageAnimation } from "./types";
import { Page } from "./page";
import { View } from "react-native";

type PageAnimationSpec = {
  incoming?: PageAnimation | PageAnimation[];
  outgoing?: PageAnimation | PageAnimation[];
};

type PageAnimationSpecFn = (spec: PageAnimationSpec) => void;

type PageFlow = {
  show: (page: JSX.Element) => { animate: PageAnimationSpecFn };

  when: (predicate: boolean) => {
    show: (page: JSX.Element) => { animate: PageAnimationSpecFn };
  };
};

type ViewFn = (props?: RenderProps) => JSX.Element;

type PageAnnotations = {
  [key: string]: "new" | "removed" | undefined;
};

type PageAnimations = {
  [key: string]: {
    incoming: PageAnimation[];
    outgoing: PageAnimation[];
  };
};

type RenderProps = { width?: number | string; height?: number | string };

export function usePages(initialPages: JSX.Element | JSX.Element[] = []) {
  let priorPagesRef = useRef<JSX.Element[]>(
    _.isArray(initialPages) ? initialPages : [initialPages]
  );
  let [, setExpiredAt] = useState(0);
  let pages = _.isArray(initialPages) ? initialPages : [initialPages];
  const pageAnnotations = {} as PageAnnotations;
  const pageAnimations = useRef<PageAnimations>({}).current;

  const priorPages = priorPagesRef.current;

  const isPriorPage = (page: JSX.Element) =>
    !!priorPages.find((p) => p.key === page.key);

  priorPagesRef.current = [];
  const pushPage = (page: JSX.Element) => {
    if (!isPriorPage(page)) {
      pageAnnotations[page.key!] = "new";
    }
    pageAnimations[page.key!] = {
      incoming: ["slideFromRight"],
      outgoing: ["slideToRight"],
    };
    pages.push(page);

    return {
      animate: (({
        incoming = "slideFromRight",
        outgoing = "slideToRight",
      }: PageAnimationSpec) => {
        pageAnimations[page.key!] = {
          incoming: _.isArray(incoming) ? incoming : [incoming],
          outgoing: _.isArray(outgoing) ? outgoing : [outgoing],
        };
      }) as PageAnimationSpecFn,
    };
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
                animate: (spec: PageAnimationSpec) => {},
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

      pages = _.concat(pages, removedPages);

      return (
        <View
          key={"flow-container"}
          style={{
            overflow: "hidden",
            width,
            height,
            backgroundColor: "white",
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 15,
          }}
        >
          {pages.map((pg, idx) => (
            <View
              key={`pg-background-${pg.key}`}
              style={{
                position: "absolute",
                zIndex: idx,
                width,
                height,
              }}
            >
              <Page
                key={`pg-${pg.key}`}
                width={200}
                height={200}
                animation={
                  pageAnnotations[pg.key!] === "new"
                    ? pageAnimations[pg.key!].incoming
                    : pageAnnotations[pg.key!] === "removed"
                    ? pageAnimations[pg.key!].outgoing
                    : "none"
                }
                onAnimationFinished={() => {
                  if (pageAnnotations[pg.key!] !== "removed") {
                    priorPagesRef.current.push(pg);
                  } else {
                    setExpiredAt(Date.now());
                  }
                }}
              >
                <View
                  style={{
                    backgroundColor: "lightgray",
                    width,
                    height,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                >
                  {pg}
                </View>
              </Page>
            </View>
          ))}
        </View>
      );
    },
  ] as [PageFlow, ViewFn];
}
