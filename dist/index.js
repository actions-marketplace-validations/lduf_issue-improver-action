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
exports.container = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const action_runner_1 = require("./services/action-runner");
const openai_1 = require("openai");
const comment_builder_1 = require("./services/comment-builder");
const config_reader_1 = require("./config/config-reader");
const type_chef_di_1 = require("type-chef-di");
const custom_section_creator_1 = require("./section-creators/custom.section-creator");
const related_issues_section_creator_1 = require("./section-creators/related-issues.section-creator");
const summarise_section_creator_1 = require("./section-creators/summarise.section-creator");
const label_section_creator_1 = require("./section-creators/label.section-creator");
const summarise_comments_section_creator_1 = require("./section-creators/summarise-comments.section-creator");
exports.container = new type_chef_di_1.Container({ enableAutoCreate: true });
const sectionCreators = [
    custom_section_creator_1.CustomSectionCreator,
    related_issues_section_creator_1.RelatedIssuesSectionCreator,
    summarise_section_creator_1.SummariseSectionCreator,
    label_section_creator_1.LabelSectionCreator,
    summarise_comments_section_creator_1.SummariseCommentsSectionCreator,
];
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = {
            apiKey: core.getInput('openai-key'),
            githubToken: core.getInput('github-token'),
            debug: core.getBooleanInput('debug-mode'),
            maxTokens: Number.parseInt(core.getInput('max-tokens')),
            model: core.getInput('model', { required: false }),
            configFile: core.getInput('config-file'),
            addRelatedIssuesSection: core.getBooleanInput('add-related-issues-section'),
            addSummarySection: core.getBooleanInput('add-summary-section'),
            addCommentSummarySection: core.getBooleanInput('add-comment-summary-section'),
            addCustomSection: ((_a = core.getInput('add-custom-section')) === null || _a === void 0 ? void 0 : _a.split(',')) || [],
            addLabelSection: core.getBooleanInput('add-label-section'),
        };
        const config = yield (0, config_reader_1.getConfig)(inputs.configFile);
        const openaiClient = new openai_1.OpenAIApi(new openai_1.Configuration({
            apiKey: inputs.apiKey,
        }));
        const octokit = yield github.getOctokit(inputs.githubToken);
        exports.container.register('octokit', octokit);
        const context = github.context;
        const issue = context.payload.issue;
        core.notice(`Is debug mode: ${inputs.debug ? 'true' : 'false'}`);
        core.notice(JSON.stringify(issue));
        const commentBuilder = new comment_builder_1.CommentBuilder();
        for (const sectionCreatorClass of sectionCreators) {
            const sectionCreator = yield exports.container.resolveByType(sectionCreatorClass);
            if (sectionCreator.isAddSection(inputs, config)) {
                commentBuilder.addSections(yield sectionCreator.createSection(inputs, openaiClient, octokit, config), inputs.debug);
            }
        }
        const createComment = (message) => __awaiter(this, void 0, void 0, function* () {
            yield octokit.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issue === null || issue === void 0 ? void 0 : issue.number,
                body: message,
            });
        });
        core.notice(`Try to create a comment...`);
        core.notice('[Final Comment]: \n\n ' + commentBuilder.getMessage());
        if (inputs.debug == false) {
            yield createComment(commentBuilder.getMessage());
            core.notice('Comment created successfully');
        }
        else {
            core.notice('Comment is not created because of debug mode.');
        }
    });
}
const runner = new action_runner_1.ActionRunner({ name: 'GPT issue improver', cb: run });
runner.run();
//# sourceMappingURL=index.js.map