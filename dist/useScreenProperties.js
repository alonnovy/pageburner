"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.useScreenProperties=void 0;var react_native_1=require("react-native");var defaultScreenPropertyOptions={throttlePeriod:100,shortHeight:600,narrowWidth:800,tallHeight:1000,wideWidth:1400};function useScreenProperties(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var windowDimensions=react_native_1.useWindowDimensions();var opt=Object.assign({},defaultScreenPropertyOptions,options);return Object.assign({},windowDimensions,{isShort:window.innerHeight<=opt.shortHeight,isTall:window.innerHeight>=opt.tallHeight,isNarrow:window.innerWidth<=opt.narrowWidth,isWide:window.innerWidth>=opt.wideWidth});}exports.useScreenProperties=useScreenProperties;