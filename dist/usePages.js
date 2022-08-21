"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePages = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const lodash_1 = __importDefault(require("lodash"));
const react_3 = require("react");
const page_1 = require("./page");
const react_native_1 = require("react-native");
function usePages(initialPages = []) {
    let priorPagesRef = react_3.useRef(lodash_1.default.isArray(initialPages) ? initialPages : [initialPages]);
    let [, setExpiredAt] = react_2.useState(0);
    let pages = lodash_1.default.isArray(initialPages) ? initialPages : [initialPages];
    const pageAnnotations = {};
    const pageAnimations = react_3.useRef({}).current;
    const priorPages = priorPagesRef.current;
    const isPriorPage = (page) => !!priorPages.find((p) => p.key === page.key);
    priorPagesRef.current = [];
    const pushPage = (page) => {
        if (!isPriorPage(page)) {
            pageAnnotations[page.key] = "new";
        }
        pageAnimations[page.key] = {
            incoming: ["slideFromRight"],
            outgoing: ["slideToRight"],
        };
        pages.push(page);
        return {
            animate: (({ incoming = "slideFromRight", outgoing = "slideToRight", }) => {
                pageAnimations[page.key] = {
                    incoming: lodash_1.default.isArray(incoming) ? incoming : [incoming],
                    outgoing: lodash_1.default.isArray(outgoing) ? outgoing : [outgoing],
                };
            }),
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
                }
                else {
                    return {
                        show: () => {
                            return {
                                animate: (spec) => { },
                            };
                        },
                    };
                }
            },
        },
        ({ width = "100%", height = "100%" } = { width: "100%", height: "100%" }) => {
            const removedPages = priorPages.filter((prior) => !pages.find((current) => current.key === prior.key));
            removedPages.forEach((pg) => {
                pageAnnotations[pg.key] = "removed";
            });
            pages = lodash_1.default.concat(pages, removedPages);
            return (<react_native_1.View key={"flow-container"} style={{
                    overflow: "hidden",
                    width,
                    height,
                    backgroundColor: "white",
                    borderColor: "black",
                    borderWidth: 20,
                    borderRadius: 15,
                }}>
          <react_native_1.Text></react_native_1.Text>
          {pages.map((pg, idx) => (<react_native_1.View key={`pg-background-${pg.key}`} style={{
                        position: "absolute",
                        zIndex: idx,
                        width,
                        height,
                    }}>
              <page_1.Page key={`pg-${pg.key}`} width={200} height={200} animation={pageAnnotations[pg.key] === "new"
                        ? pageAnimations[pg.key].incoming
                        : pageAnnotations[pg.key] === "removed"
                            ? pageAnimations[pg.key].outgoing
                            : "none"} onAnimationFinished={() => {
                        if (pageAnnotations[pg.key] !== "removed") {
                            priorPagesRef.current.push(pg);
                        }
                        else {
                            setExpiredAt(Date.now());
                        }
                    }}>
                <react_native_1.View style={{
                        backgroundColor: "lightgray",
                        width,
                        height,
                        borderColor: "gray",
                        borderWidth: 1,
                    }}>
                  {pg}
                </react_native_1.View>
              </page_1.Page>
            </react_native_1.View>))}
        </react_native_1.View>);
        },
    ];
}
exports.usePages = usePages;
