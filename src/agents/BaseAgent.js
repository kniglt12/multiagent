const { ConversationChain } = require("langchain/chains");
const { ChatOpenAI } = require("@langchain/openai");
const {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder,
} = require("@langchain/core/prompts");
const { BufferMemory } = require("langchain/memory");
const { getModelClient } = require('../config/llmSettings');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'log');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}
const logFile = path.join(logDir, 'temp.log');

function makeLog(agentInstance, task, result) {
    const logEntry = `
================================================================================
Agent: ${agentInstance.name}
Task: ${task}
Result: ${result}
================================================================================
`;
    fs.appendFileSync(logFile, logEntry, 'utf-8');
}

class BaseAgent {
    constructor(sysPrompt = null, name = 'BaseAgent') {
        this.system_message = sysPrompt;
        this.name = name;
        this.agent = null;
    }

    async initialize() {
        const { client, model } = getModelClient();

        const chatPrompt = ChatPromptTemplate.fromMessages([
            SystemMessagePromptTemplate.fromTemplate(this.system_message),
            new MessagesPlaceholder("history"),
            HumanMessagePromptTemplate.fromTemplate("{input}"),
        ]);

        const chat = new ChatOpenAI({
            modelName: model,
            temperature: 0,
            openAIApiKey: client.apiKey,
            configuration: {
                baseURL: client.baseURL,
            }
        });

        this.agent = new ConversationChain({
            memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
            prompt: chatPrompt,
            llm: chat,
        });
    }

    async step(task) {
        if (!this.agent) {
            await this.initialize();
        }

        const response = await this.agent.call({ input: task });
        const result = response.response;
        makeLog(this, task, result);
        return result;
    }

    async run(task) {
        return await this.step(task);
    }


}

module.exports = { BaseAgent };
