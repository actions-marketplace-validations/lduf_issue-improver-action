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
exports.placeholderMap = void 0;
const issue_comments_placeholder_1 = require("./issue-comments.placeholder");
const all_labels_placeholder_1 = require("./all-labels.placeholder");
const openIssues_placeholder_1 = require("./openIssues.placeholder");
const index_1 = require("../index");
const github = __importStar(require("@actions/github"));
/**
 * all available placeholder
 */
exports.placeholderMap = {
    /**
     * {{issueBody}}
     */
    issueBody: () => {
        var _a;
        return (_a = github.context.payload.issue) === null || _a === void 0 ? void 0 : _a.body;
    },
    /**
     * {{issueBody}}
     */
    issueTitle: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return (_a = github.context.payload.issue) === null || _a === void 0 ? void 0 : _a.title;
    }),
    /**
     * {{issueAuthor}}
     */
    issueAuthor: () => {
        var _a, _b;
        return (_b = (_a = github.context.payload.issue) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.login;
    },
    /**
     * {{issueNumber}}
     */
    issueNumber: () => {
        var _a, _b;
        return (_b = (_a = github.context.payload.issue) === null || _a === void 0 ? void 0 : _a.number) === null || _b === void 0 ? void 0 : _b.toString();
    },
    /**
     * {{issueBody}} All issue comments in Json string format.
     */
    issueComments: fromPlaceholderProvider(issue_comments_placeholder_1.IssueCommentsPlaceholder),
    /**
     * {{allLabels}} All available repository label.
     */
    allLabels: fromPlaceholderProvider(all_labels_placeholder_1.AllLabelsPlaceholder),
    /**
     * {{openIssues}} All Open issues in JSON string format.
     */
    openIssues: fromPlaceholderProvider(openIssues_placeholder_1.OpenIssuesPlaceholder),
};
function fromPlaceholderProvider(type) {
    return () => __awaiter(this, void 0, void 0, function* () {
        return (yield index_1.container.resolveByType(type)).provideValue();
    });
}
//# sourceMappingURL=placeholder-map.js.map