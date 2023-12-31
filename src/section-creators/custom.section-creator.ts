import { OpenAIApi } from 'openai';
import { ISectionCreator } from '../interfaces/section-creator.interface';
import { ISection } from '../services/comment-builder';
import { IConfig } from '../interfaces/config.interface';
import { IInputs } from '../interfaces/inputs.interface';
import { Injectable } from 'type-chef-di';
import { PlaceholderResolver } from '../services/placeholder-resolver';
import { IOctokit } from '../interfaces/octokit.interface';

@Injectable()
export class CustomSectionCreator implements ISectionCreator {
    constructor(private readonly placeholderResolver: PlaceholderResolver) {}
    isAddSection(inputs: IInputs, config?: Partial<IConfig>): boolean {
        return inputs.addCustomSection.length > 0 && config?.sections?.custom?.length > 0;
    }
    async createSection(
        inputs: IInputs,
        openaiClient: OpenAIApi,
        octokit: IOctokit,
        config: Partial<IConfig>,
    ): Promise<ISection[]> {
        const askGpt = async (messages: string[]) => {
            return (
                await openaiClient.createChatCompletion({
                    model: inputs.model,
                    messages: messages.map((message) => ({ role: 'system', content: message })),
                    max_tokens: inputs.maxTokens,
                })
            ).data.choices[0].message.content;
        };

        const resultSections: ISection[] = [];
        for (const sectionConfig of config.sections.custom) {
            const isIncludeSection =
                inputs.addCustomSection.includes(sectionConfig?.id || sectionConfig.title) ||
                inputs.addCustomSection[0] == '*';

            if (!isIncludeSection) {
                continue;
            }
            const resolvedPrompt = await this.placeholderResolver.resolve(sectionConfig.prompt);
            const message = await askGpt([resolvedPrompt]);
            resultSections.push({ title: sectionConfig.title, description: message, prompt: resolvedPrompt });
        }

        return resultSections;
    }
}
