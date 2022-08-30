import { useEffect, useLayoutEffect, useRef } from "react";
import { Animated, Keyboard } from "react-native";
import { PageAnimation, PageAnimationSpeed } from "./types";
import { Platform } from "react-native";
import _ from "lodash";

const defaultDuration = 300;

type PageProps = {
  animation?: PageAnimation | PageAnimation[];
  animationSpeed?: PageAnimationSpeed;
  onAnimationFinished?: () => void;
  width: number;
  height: number;
  children: JSX.Element;
};

export function Page({
  animation,
  animationSpeed,
  onAnimationFinished,
  width,
  height,
  children,
}: PageProps) {
  const x = useRef<Animated.Value>(new Animated.Value(0)).current;
  const y = useRef<Animated.Value>(new Animated.Value(0)).current;
  const opacity = useRef<Animated.Value>(new Animated.Value(1)).current;
  const scale = useRef<Animated.Value>(new Animated.Value(1)).current;
  const spinAngle = useRef<Animated.Value>(new Animated.Value(0)).current;
  const flipAngle = useRef<Animated.Value>(new Animated.Value(0)).current;
  const viewRef = useRef<Element>();
  const lastAnimationRef = useRef<Animated.CompositeAnimation>();
  const useNativeDriver = Platform.OS !== "web";
  let duration: number;

  switch (animationSpeed) {
    case "slow":
      duration = 1500;
      break;
    case "medium":
      duration = 750;
      break;
    default:
      duration = 300;
  }

  const spin = spinAngle.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const flip = flipAngle.interpolate({
    inputRange: [270, 360],
    outputRange: ["270deg", "360deg"],
  });

  useEffect(() => {
    const runners = [] as Animated.CompositeAnimation[];
    const animations = _.isArray(animation) ? animation : [animation];

    if (!animations.length) {
      onAnimationFinished?.call(undefined);
    } else if (animations.length === 1 && animations[0] === "none") {
      onAnimationFinished?.call(undefined);
    } else {
      Keyboard.dismiss();
      animations.forEach((a) => {
        if (a === "slideFromRight") {
          x.setValue(width);
          runners.push(
            Animated.timing(x, {
              toValue: 0,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "slideToRight") {
          x.setValue(0);
          runners.push(
            Animated.timing(x, {
              toValue: width,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "slideFromLeft") {
          x.setValue(-width);
          runners.push(
            Animated.timing(x, {
              toValue: 0,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "slideToLeft") {
          x.setValue(0);
          runners.push(
            Animated.timing(x, {
              toValue: -width,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "slideFromBottom") {
          y.setValue(height);
          runners.push(
            Animated.timing(y, {
              toValue: 0,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "slideToBottom") {
          y.setValue(0);
          runners.push(
            Animated.timing(y, {
              toValue: height,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "slideFromTop") {
          y.setValue(-height);
          runners.push(
            Animated.timing(y, {
              toValue: 0,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "slideToTop") {
          y.setValue(0);
          runners.push(
            Animated.timing(y, {
              toValue: -height,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "fadeIn") {
          opacity.setValue(0);
          runners.push(
            Animated.timing(opacity, {
              toValue: 1,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "fadeOut") {
          opacity.setValue(1);
          runners.push(
            Animated.timing(opacity, {
              toValue: 0,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "scaleUp") {
          scale.setValue(0);
          runners.push(
            Animated.timing(scale, {
              toValue: 1,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "scaleDown") {
          scale.setValue(1);
          runners.push(
            Animated.timing(scale, {
              toValue: 0,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "spinClockwise") {
          spinAngle.setValue(0);
          runners.push(
            Animated.timing(spinAngle, {
              toValue: 360,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "spinCounterClockwise") {
          spinAngle.setValue(360);
          runners.push(
            Animated.timing(spinAngle, {
              toValue: 0,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "flipUp") {
          flipAngle.setValue(270);
          runners.push(
            Animated.timing(flipAngle, {
              toValue: 360,
              duration,
              useNativeDriver,
            })
          );
        } else if (a === "flipDown") {
          flipAngle.setValue(360);
          runners.push(
            Animated.timing(flipAngle, {
              toValue: 270,
              duration,
              useNativeDriver,
            })
          );
        }
      });

      if (lastAnimationRef.current) {
        lastAnimationRef.current.stop();
      }

      lastAnimationRef.current = Animated.parallel(runners);

      lastAnimationRef.current.start(() => {
        lastAnimationRef.current = undefined;
        onAnimationFinished?.call(undefined);
      });
    }
  });

  return (
    <Animated.View
      ref={viewRef}
      onLayout={(ev) => {
        width = ev.nativeEvent.layout.width;
        height = ev.nativeEvent.layout.height;
      }}
      style={
        animation !== "none"
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
          : undefined
      }
    >
      {children}
    </Animated.View>
  );
}
