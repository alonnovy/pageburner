"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _jsxRuntime=require("react/jsx-runtime");var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{"default":mod};};Object.defineProperty(exports,"__esModule",{value:true});exports.usePages=void 0;var react_1=__importDefault(require("react"));var react_2=require("react");var lodash_1=__importDefault(require("lodash"));var react_3=require("react");var page_1=require("./page");var react_native_1=require("react-native");function usePages(){var initialPages=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var priorPagesRef=react_3.useRef(lodash_1.default.isArray(initialPages)?initialPages:[initialPages]);var _react_2$useState=react_2.useState(0),_react_2$useState2=(0,_slicedToArray2.default)(_react_2$useState,2),setExpiredAt=_react_2$useState2[1];var pages=lodash_1.default.isArray(initialPages)?initialPages:[initialPages];var pageAnnotations={};var pageAnimations=react_3.useRef({}).current;var priorPages=priorPagesRef.current;var isPriorPage=function isPriorPage(page){return!!priorPages.find(function(p){return p.key===page.key;});};priorPagesRef.current=[];var pushPage=function pushPage(page){if(!isPriorPage(page)){pageAnnotations[page.key]="new";}pageAnimations[page.key]={incoming:["slideFromRight"],outgoing:["slideToRight"]};pages.push(page);return{animate:function animate(_ref){var _ref$incoming=_ref.incoming,incoming=_ref$incoming===void 0?"slideFromRight":_ref$incoming,_ref$outgoing=_ref.outgoing,outgoing=_ref$outgoing===void 0?"slideToRight":_ref$outgoing;pageAnimations[page.key]={incoming:lodash_1.default.isArray(incoming)?incoming:[incoming],outgoing:lodash_1.default.isArray(outgoing)?outgoing:[outgoing]};}};};return[{show:pushPage,when:function when(predicate){if(predicate){return{show:pushPage};}else{return{show:function show(){return{animate:function animate(spec){}};}};}}},function(){var _ref2=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{width:"100%",height:"100%"},_ref2$width=_ref2.width,width=_ref2$width===void 0?"100%":_ref2$width,_ref2$height=_ref2.height,height=_ref2$height===void 0?"100%":_ref2$height;var removedPages=priorPages.filter(function(prior){return!pages.find(function(current){return current.key===prior.key;});});removedPages.forEach(function(pg){pageAnnotations[pg.key]="removed";});pages=lodash_1.default.concat(pages,removedPages);return(0,_jsxRuntime.jsxs)(react_native_1.View,{style:{overflow:"hidden",width:width,height:height},children:[(0,_jsxRuntime.jsx)(react_native_1.Text,{}),pages.map(function(pg,idx){return(0,_jsxRuntime.jsx)(react_native_1.View,{style:{position:"absolute",zIndex:idx,width:width,height:height},children:(0,_jsxRuntime.jsx)(page_1.Page,{width:200,height:200,animation:pageAnnotations[pg.key]==="new"?pageAnimations[pg.key].incoming:pageAnnotations[pg.key]==="removed"?pageAnimations[pg.key].outgoing:"none",animationSpeed:pageAnimations[pg.key].speed,onAnimationFinished:function onAnimationFinished(){if(pageAnnotations[pg.key]!=="removed"){priorPagesRef.current.push(pg);}else{setExpiredAt(Date.now());}},children:(0,_jsxRuntime.jsx)(react_native_1.View,{style:{backgroundColor:"lightgray",width:width,height:height,borderColor:"gray",borderWidth:1},children:pg})},"pg-"+pg.key)},"pg-background-"+pg.key);})]},"flow-container");}];}exports.usePages=usePages;