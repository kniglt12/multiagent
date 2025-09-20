const { BaseAgent } = require('./BaseAgent');
const { StatePrompt, ActionPrompt } = require('../prompts/prompts');

class SimplifiedAgent {
    constructor() {
        this.stateAgent = null;
        this.actionAgent = null;
        this.last_action_feedback = null;
    }

    async initialize() {
        this.stateAgent = new BaseAgent(StatePrompt, "StateAgent");
        await this.stateAgent.initialize();

        this.actionAgent = new BaseAgent(ActionPrompt, "ActionAgent");
        await this.actionAgent.initialize();
    }

    async run(currentObservation) {
        // 1. 确定当前状态
        const stateInput = `上一个动作: ${this.last_action_feedback}\n当前观察: ${currentObservation}`;
        const currentState = await this.stateAgent.run(stateInput);

        // 2. 根据状态决定下一个动作
        const action = await this.actionAgent.run(`当前状态: ${currentState}`);

        this.last_action_feedback = action;
        return action;
    }
}

module.exports = { SimplifiedAgent };

