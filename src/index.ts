import * as core from '@actions/core';
import * as github from '@actions/github';
import { ActionRunner } from './services/action-runner';
import { Utils } from './utils';
import { Configuration, OpenAIApi } from 'openai';

async function run() {
    const apiKey = core.getInput('api-key');
    const template = core.getInput('template');
    const githubToken = core.getInput('github-token');

    const octokit = await github.getOctokit(githubToken);
    const context = github.context;
    const issue = context.payload.issue;

    core.notice(JSON.stringify(issue));

    const resolvedTemple = Utils.resolveTemplate(template, {
        issueBody: issue?.body || '',
        issueTitle: issue?.title || '',
        author: issue.user.login || '',
    });

    core.notice(`[Prompt]: ${resolvedTemple}`);
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openaiClient = new OpenAIApi(configuration);
    const completion = await openaiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: resolvedTemple,
        max_tokens: 150,
    });
    const gptMessage = completion.data.choices[0].text;

    core.notice(`[GPT MESSAGE]: ${resolvedTemple}`);

    await octokit.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: issue?.number,
        body: gptMessage,
    });

    core.notice('Comment created successfully');
}

const runner = new ActionRunner({ name: 'GPT issue improver', cb: run });
runner.run();
