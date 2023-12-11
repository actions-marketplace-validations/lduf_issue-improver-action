"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.RelatedIssuesSectionCreator = void 0;
const type_chef_di_1 = require("type-chef-di");
const placeholder_resolver_1 = require("../services/placeholder-resolver");
let RelatedIssuesSectionCreator = class RelatedIssuesSectionCreator {
    constructor(placeholderResolver) {
        this.placeholderResolver = placeholderResolver;
    }
    isAddSection(inputs, config) {
        return (inputs.addRelatedIssuesSection &&
            !!config.sections.relatedIssues.prompt &&
            !!config.sections.relatedIssues.title);
    }
    createSection(inputs, openaiClient, octokit, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const resolvedTemple = yield this.placeholderResolver.resolve(config.sections.relatedIssues.prompt);
            const relatedIssuesResponse = yield openaiClient.createCompletion({
                model: inputs.model,
                prompt: resolvedTemple,
                max_tokens: inputs.maxTokens,
            });
            return [
                {
                    prompt: resolvedTemple,
                    title: config.sections.relatedIssues.title,
                    description: relatedIssuesResponse.data.choices[0].text,
                },
            ];
        });
    }
};
RelatedIssuesSectionCreator = __decorate([
    (0, type_chef_di_1.Injectable)(),
    __metadata("design:paramtypes", [placeholder_resolver_1.PlaceholderResolver])
], RelatedIssuesSectionCreator);
exports.RelatedIssuesSectionCreator = RelatedIssuesSectionCreator;
//# sourceMappingURL=related-issues.section-creator.js.map