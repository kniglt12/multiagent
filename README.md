#### 如何运行?

```bash
npm install

node planTest.js 
```

#### 代码说明

- **`planTest.js`**: 项目的入口文件，用于运行汉诺塔游戏测试。它初始化 `SimplifiedAgent` 并管理游戏循环，直到游戏完成。（不需要修改）

- **`src/agents/BaseAgent.js`**: 定义了 `BaseAgent` 类，这是与大语言模型（LLM）交互的基础。它使用 `langchain` 库来创建一个带有记忆功能的对话链。（不需要修改）

-   **`src/agents/PlanningAgent.js`**: 定义了 `SimplifiedAgent` 类，目前它由两个 `BaseAgent` 实例组成：
    
    - `stateAgent`: 用于分析上一个动作的反馈和当前观察，以确定当前环境的状态。
    
    - `actionAgent`: 根据 `stateAgent` 提供的当前状态，决定下一步要执行的动作。
    
      你可以增加更多的agent，修改其内部逻辑。
    
- **`src/config/llmSettings.js`**: 配置文件，用于设置与大语言模型连接所需的客户端和模型参数。（不需要修改）

- **`src/prompts/prompts.js`**: 存储prompt相关东西。

- **`src/test/hanoi.js`**: 实现了汉诺塔游戏的逻辑，包括游戏任务描述、初始状态以及处理和验证代理移动指令的函数。（不需要修改）

-   **`src/log/temp.log`**: 用于记录代理与环境之间的所有交互日志。（不需要修改）



