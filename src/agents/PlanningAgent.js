const { BaseAgent } = require('./BaseAgent');

const StatePrompt = `你是一个汉诺塔游戏的状态观察员。你的工作是描述每个柱子（A、B、C）的当前状态和圆盘的位置。根据上一个动作和当前的观察，确定当前的状态。初始状态是：A有[4, 3, 2, 1]，B是空的，C是空的。目标是将所有圆盘按[4, 3, 2, 1]的顺序移动到C。`;
const ActionPrompt = `你是一个汉诺塔游戏的策略玩家。根据游戏的当前状态，决定下一步的单一移动。你的输出必须是“move N from X to Y”的格式。`;

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
        const stateInput = `上一个动作的反馈: ${this.last_action_feedback}\n当前观察: ${currentObservation}`;
        const currentState = await this.stateAgent.run(stateInput);

        // 2. 根据状态决定下一个动作
        const action = await this.actionAgent.run(`当前状态: ${currentState}`);

        // action agent应该直接输出移动指令
        this.last_action_feedback = currentObservation;
        return action;
    }
}

module.exports = { SimplifiedAgent };

