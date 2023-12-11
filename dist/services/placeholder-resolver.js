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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceholderResolver = void 0;
const utils_1 = require("./utils");
const placeholder_map_1 = require("../placeholder-providers/placeholder-map");
const core = __importStar(require("@actions/core"));
const type_chef_di_1 = require("type-chef-di");
let PlaceholderResolver = class PlaceholderResolver {
    constructor() {
        this.cache = new Map();
    }
    resolve(template) {
        return __awaiter(this, void 0, void 0, function* () {
            const placeholderKeys = utils_1.Utils.getPlaceholders(template);
            const templateContext = {};
            for (const placeholderKey of placeholderKeys) {
                if (this.cache.has(placeholderKey)) {
                    templateContext[placeholderKey] = this.cache.get(placeholderKey);
                }
                if (placeholder_map_1.placeholderMap[placeholderKey] == undefined) {
                    core.notice(`Cant resolve: ${placeholderKey} placeholder.`);
                    continue;
                }
                const resultText = yield placeholder_map_1.placeholderMap[placeholderKey]();
                this.cache.set(placeholderKey, resultText);
                templateContext[placeholderKey] = resultText;
            }
            core.notice(`Resolved: ${Object.keys(templateContext)
                .map((value) => `{{${value}}} --> ${templateContext[value].substring(0, 10)}...`)
                .join(',')}`);
            core.notice(`Not Resolved: ${placeholderKeys
                .filter((placeholder) => {
                return !Object.keys(templateContext).includes(placeholder);
            })
                .map((value) => `{{${value}}}`)
                .join(',')}`);
            return utils_1.Utils.resolveTemplate(template, templateContext);
        });
    }
};
PlaceholderResolver = __decorate([
    (0, type_chef_di_1.Injectable)({ instantiation: 'singleton' })
], PlaceholderResolver);
exports.PlaceholderResolver = PlaceholderResolver;
//# sourceMappingURL=placeholder-resolver.js.map