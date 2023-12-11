"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.Utils = void 0;
const core = __importStar(require("@actions/core"));
class Utils {
    static resolveTemplate(template, context) {
        return template.replace(/{{([^}]+)}}/g, (match, prop) => {
            var _a;
            return ((_a = context[prop]) !== null && _a !== void 0 ? _a : (function () {
                core.warning(`Can't resolve ${match} value.`);
                return `${match}`;
            })());
        });
    }
    static getPlaceholders(text) {
        const regex = /{{(.*?)}}/g;
        const matches = text.match(regex);
        if (!matches) {
            return [];
        }
        return matches.map((match) => {
            const placeholder = match.slice(2, -2).trim();
            return placeholder;
        });
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map