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
        this.client = null;
        this.model = null;
    }

    async initialize() {
        const { client, model } = getModelClient();
        this.client = client;
        this.model = model;
    }

    async step(task) {
        if (!this.client) {
            await this.initialize();
        }

        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                { role: "system", content: this.system_message },
                { role: "user", content: task }
            ],
        });

        const result = response.choices[0].message.content;
        makeLog(this, task, result);
        return result;
    }

    async run(task) {
        return await this.step(task);
    }


}

module.exports = { BaseAgent };
