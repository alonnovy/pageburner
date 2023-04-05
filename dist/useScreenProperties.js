"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{"default":mod};};Object.defineProperty(exports,"__esModule",{value:true});exports.useScreenProperties=void 0;var lodash_1=__importDefault(require("lodash"));var react_native_1=require("react-native");var defaultScreenPropertyOptions={throttlePeriod:100,shortHeight:600,narrowWidth:lodash_1.default.includes(["ios","android"],react_native_1.Platform.OS)?600:500,tallHeight:1000,wideWidth:1400};function useScreenProperties(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var windowDimensions=(0,react_native_1.useWindowDimensions)();var opt=Object.assign({},defaultScreenPropertyOptions,options);return Object.assign({},windowDimensions,{isShort:windowDimensions.height<=opt.shortHeight,isTall:windowDimensions.height>=opt.tallHeight,isNarrow:windowDimensions.width<=opt.narrowWidth,isWide:windowDimensions.width>=opt.wideWidth,isLandscapeLayout:windowDimensions.width>=windowDimensions.height});}exports.useScreenProperties=useScreenProperties;