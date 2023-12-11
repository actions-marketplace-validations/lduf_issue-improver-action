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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const core = __importStar(require("@actions/core"));
const default_config_1 = require("./default-config");
function getConfig(path) {
    const fileName = path || 'issue-improver-config.json';
    if (!fs_1.default.existsSync(fileName)) {
        core.notice(`Config file '${fileName}' not found.`);
        core.notice(`Loading default config.`);
        core.notice(`Config loaded: ${JSON.stringify(default_config_1.defaultConfig)}`);
        return default_config_1.defaultConfig;
    }
    const fileContents = fs_1.default.readFileSync(fileName, 'utf8');
    const config = JSON.parse(fileContents);
    config.sections = Object.assign(Object.assign({}, default_config_1.defaultConfig.sections), config.sections);
    core.notice(`Config loaded: ${JSON.stringify(config)}`);
    return config;
}
exports.getConfig = getConfig;
//# sourceMappingURL=config-reader.js.map