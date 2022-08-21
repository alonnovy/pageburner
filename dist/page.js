"use strict";var _jsxRuntime=require("react/jsx-runtime");var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{"default":mod};};Object.defineProperty(exports,"__esModule",{value:true});exports.Page=void 0;var react_1=require("react");var react_native_1=require("react-native");var react_native_2=require("react-native");var lodash_1=__importDefault(require("lodash"));var duration=300;function Page(_ref){var animation=_ref.animation,onAnimationFinished=_ref.onAnimationFinished,width=_ref.width,height=_ref.height,children=_ref.children;var x=react_1.useRef(new react_native_1.Animated.Value(0)).current;var y=react_1.useRef(new react_native_1.Animated.Value(0)).current;var opacity=react_1.useRef(new react_native_1.Animated.Value(1)).current;var scale=react_1.useRef(new react_native_1.Animated.Value(1)).current;var spinAngle=react_1.useRef(new react_native_1.Animated.Value(0)).current;var flipAngle=react_1.useRef(new react_native_1.Animated.Value(0)).current;var viewRef=react_1.useRef();var lastAnimationRef=react_1.useRef();var useNativeDriver=react_native_2.Platform.OS!=="web";var spin=spinAngle.interpolate({inputRange:[0,360],outputRange:["0deg","360deg"]});var flip=flipAngle.interpolate({inputRange:[270,360],outputRange:["270deg","360deg"]});react_1.useEffect(function(){var runners=[];var animations=lodash_1.default.isArray(animation)?animation:[animation];if(!animations.length){onAnimationFinished===null||onAnimationFinished===void 0?void 0:onAnimationFinished.call(undefined);}else if(animations.length===1&&animations[0]==="none"){onAnimationFinished===null||onAnimationFinished===void 0?void 0:onAnimationFinished.call(undefined);}else{react_native_1.Keyboard.dismiss();animations.forEach(function(a){if(a==="slideFromRight"){x.setValue(width);runners.push(react_native_1.Animated.timing(x,{toValue:0,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="slideToRight"){x.setValue(0);runners.push(react_native_1.Animated.timing(x,{toValue:width,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="slideFromLeft"){x.setValue(-width);runners.push(react_native_1.Animated.timing(x,{toValue:0,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="slideToLeft"){x.setValue(0);runners.push(react_native_1.Animated.timing(x,{toValue:-width,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="slideFromBottom"){y.setValue(height);runners.push(react_native_1.Animated.timing(y,{toValue:0,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="slideToBottom"){y.setValue(0);runners.push(react_native_1.Animated.timing(y,{toValue:height,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="slideFromTop"){y.setValue(-height);runners.push(react_native_1.Animated.timing(y,{toValue:0,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="slideToTop"){y.setValue(0);runners.push(react_native_1.Animated.timing(y,{toValue:-height,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="fadeIn"){opacity.setValue(0);runners.push(react_native_1.Animated.timing(opacity,{toValue:1,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="fadeOut"){opacity.setValue(1);runners.push(react_native_1.Animated.timing(opacity,{toValue:0,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="scaleUp"){scale.setValue(0);runners.push(react_native_1.Animated.timing(scale,{toValue:1,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="scaleDown"){scale.setValue(1);runners.push(react_native_1.Animated.timing(scale,{toValue:0,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="spinClockwise"){spinAngle.setValue(0);runners.push(react_native_1.Animated.timing(spinAngle,{toValue:360,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="spinCounterClockwise"){spinAngle.setValue(360);runners.push(react_native_1.Animated.timing(spinAngle,{toValue:0,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="flipUp"){flipAngle.setValue(270);runners.push(react_native_1.Animated.timing(flipAngle,{toValue:360,duration:duration,useNativeDriver:useNativeDriver}));}else if(a==="flipDown"){flipAngle.setValue(360);runners.push(react_native_1.Animated.timing(flipAngle,{toValue:270,duration:duration,useNativeDriver:useNativeDriver}));}});if(lastAnimationRef.current){lastAnimationRef.current.stop();}lastAnimationRef.current=react_native_1.Animated.parallel(runners);lastAnimationRef.current.start(function(){lastAnimationRef.current=undefined;onAnimationFinished===null||onAnimationFinished===void 0?void 0:onAnimationFinished.call(undefined);});}});return(0,_jsxRuntime.jsx)(react_native_1.Animated.View,{ref:viewRef,onLayout:function onLayout(ev){width=ev.nativeEvent.layout.width;height=ev.nativeEvent.layout.height;},style:animation!=="none"?{transform:[{translateX:x},{translateY:y},{scale:scale},{rotateZ:spin},{rotateX:flip},{rotateY:flip}],opacity:opacity}:undefined,children:children});}exports.Page=Page;