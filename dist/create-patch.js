"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatch = void 0;
const _ = __importStar(require("lodash"));
function resolveOverrides(styleDefault, overrides) {
    const result = _.omit(styleDefault, ["_overrides"]);
    return Object.assign(result, overrides);
}
function createPatch(target) {
    let result = _.clone(target);
    if (result.image) {
        for (let k in result.image._overrides) {
            result.image._overrides[k] = resolveOverrides(result.image, result.image._overrides[k]);
        }
    }
    if (result.text) {
        for (let k in result.text._overrides) {
            result.text._overrides[k] = resolveOverrides(result.text, result.text._overrides[k]);
        }
    }
    if (result.view) {
        for (let k in result.view._overrides) {
            result.view._overrides[k] = resolveOverrides(result.view, result.view._overrides[k]);
        }
    }
    return result;
}
exports.createPatch = createPatch;
