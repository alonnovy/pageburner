"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
const lodash_1 = __importDefault(require("lodash"));
const duration = 300;
function Page({ animation, onAnimationFinished, width, height, children, }) {
    const x = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    const y = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    const opacity = react_1.useRef(new react_native_1.Animated.Value(1)).current;
    const scale = react_1.useRef(new react_native_1.Animated.Value(1)).current;
    const spinAngle = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    const flipAngle = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    const viewRef = react_1.useRef();
    const lastAnimationRef = react_1.useRef();
    const useNativeDriver = react_native_2.Platform.OS !== "web";
    const spin = spinAngle.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"],
    });
    const flip = flipAngle.interpolate({
        inputRange: [270, 360],
        outputRange: ["270deg", "360deg"],
    });
    react_1.useEffect(() => {
        const runners = [];
        const animations = lodash_1.default.isArray(animation) ? animation : [animation];
        if (!animations.length) {
            onAnimationFinished === null || onAnimationFinished === void 0 ? void 0 : onAnimationFinished.call(undefined);
        }
        else if (animations.length === 1 && animations[0] === "none") {
            onAnimationFinished === null || onAnimationFinished === void 0 ? void 0 : onAnimationFinished.call(undefined);
        }
        else {
            react_native_1.Keyboard.dismiss();
            animations.forEach((a) => {
                if (a === "slideFromRight") {
                    x.setValue(width);
                    runners.push(react_native_1.Animated.timing(x, {
                        toValue: 0,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "slideToRight") {
                    x.setValue(0);
                    runners.push(react_native_1.Animated.timing(x, {
                        toValue: width,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "slideFromLeft") {
                    x.setValue(-width);
                    runners.push(react_native_1.Animated.timing(x, {
                        toValue: 0,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "slideToLeft") {
                    x.setValue(0);
                    runners.push(react_native_1.Animated.timing(x, {
                        toValue: -width,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "slideFromBottom") {
                    y.setValue(height);
                    runners.push(react_native_1.Animated.timing(y, {
                        toValue: 0,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "slideToBottom") {
                    y.setValue(0);
                    runners.push(react_native_1.Animated.timing(y, {
                        toValue: height,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "slideFromTop") {
                    y.setValue(-height);
                    runners.push(react_native_1.Animated.timing(y, {
                        toValue: 0,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "slideToTop") {
                    y.setValue(0);
                    runners.push(react_native_1.Animated.timing(y, {
                        toValue: -height,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "fadeIn") {
                    opacity.setValue(0);
                    runners.push(react_native_1.Animated.timing(opacity, {
                        toValue: 1,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "fadeOut") {
                    opacity.setValue(1);
                    runners.push(react_native_1.Animated.timing(opacity, {
                        toValue: 0,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "scaleUp") {
                    scale.setValue(0);
                    runners.push(react_native_1.Animated.timing(scale, {
                        toValue: 1,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "scaleDown") {
                    scale.setValue(1);
                    runners.push(react_native_1.Animated.timing(scale, {
                        toValue: 0,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "spinClockwise") {
                    spinAngle.setValue(0);
                    runners.push(react_native_1.Animated.timing(spinAngle, {
                        toValue: 360,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "spinCounterClockwise") {
                    spinAngle.setValue(360);
                    runners.push(react_native_1.Animated.timing(spinAngle, {
                        toValue: 0,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "flipUp") {
                    flipAngle.setValue(270);
                    runners.push(react_native_1.Animated.timing(flipAngle, {
                        toValue: 360,
                        duration,
                        useNativeDriver,
                    }));
                }
                else if (a === "flipDown") {
                    flipAngle.setValue(360);
                    runners.push(react_native_1.Animated.timing(flipAngle, {
                        toValue: 270,
                        duration,
                        useNativeDriver,
                    }));
                }
            });
            if (lastAnimationRef.current) {
                lastAnimationRef.current.stop();
            }
            lastAnimationRef.current = react_native_1.Animated.parallel(runners);
            lastAnimationRef.current.start(() => {
                lastAnimationRef.current = undefined;
                onAnimationFinished === null || onAnimationFinished === void 0 ? void 0 : onAnimationFinished.call(undefined);
            });
        }
    });
    return (<react_native_1.Animated.View ref={viewRef} onLayout={(ev) => {
            width = ev.nativeEvent.layout.width;
            height = ev.nativeEvent.layout.height;
        }} style={animation !== "none"
            ? {
                transform: [
                    {
                        translateX: x,
                    },
                    {
                        translateY: y,
                    },
                    {
                        scale,
                    },
                    {
                        rotateZ: spin,
                    },
                    {
                        rotateX: flip,
                    },
                    {
                        rotateY: flip,
                    },
                ],
                opacity,
            }
            : undefined}>
      {children}
    </react_native_1.Animated.View>);
}
exports.Page = Page;
