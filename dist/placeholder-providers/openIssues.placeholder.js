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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.OpenIssuesPlaceholder = void 0;
const github_1 = require("@actions/github");
const type_chef_di_1 = require("type-chef-di");
let OpenIssuesPlaceholder = class OpenIssuesPlaceholder {
    constructor(octokit) {
        this.octokit = octokit;
    }
    provideValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = github_1.context.payload.issue;
            const [issuesResponse] = yield Promise.all([
                this.octokit.rest.issues.listForRepo({
                    owner: github_1.context.repo.owner,
                    repo: github_1.context.repo.repo,
                    state: 'open',
                }),
            ]);
            const openIssues = issuesResponse.data
                .map((issue) => ({
                number: issue.number,
                title: issue.title,
                link: issue.html_url,
            }))
                .filter((openIssue) => openIssue.number != issue.number);
            return JSON.stringify(openIssues);
        });
    }
};
OpenIssuesPlaceholder = __decorate([
    (0, type_chef_di_1.Injectable)(),
    __param(0, (0, type_chef_di_1.Inject)('octokit')),
    __metadata("design:paramtypes", [Object])
], OpenIssuesPlaceholder);
exports.OpenIssuesPlaceholder = OpenIssuesPlaceholder;
//# sourceMappingURL=openIssues.placeholder.js.map