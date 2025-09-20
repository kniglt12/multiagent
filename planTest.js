const { SimplifiedAgent } = require('./src/agents/PlanningAgent');
const { hanoiTask, hanoiInput, hanoiState } = require('./src/test/hanoi');
const fs = require('fs');
const path = require('path');

async function main() {
    const logDir = path.join(__dirname, "src/log");
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path.join(logDir, "temp.log");
    fs.writeFileSync(logFile, "", "utf-8");

    const agent = new SimplifiedAgent();
    await agent.initialize();

    let input = hanoiTask;

    const max_turns = 50;

    for (let i = 0; i < max_turns; i++) {
        console.log(`\n--- 第 ${i + 1} 轮 ---`);
        try {
            const result = await agent.run(input);
            console.log("下一步指令:", result);

            if (result.includes("游戏已经完成") || result.includes("游戏已完成")) {
                if (hanoiState.C.length === 4 && JSON.stringify(hanoiState.C) === JSON.stringify([4, 3, 2, 1])) {
                    console.log("游戏已经完成！");
                    break;
                } else {
                    console.log("Agent声称游戏已完成，但状态不正确。正在结束运行。");
                    break;
                }
            }

            input = hanoiInput(result);
            console.log("移动结果:", input);

        } catch (error) {
            console.error("本轮出错:", error.message);
            // 将错误作为下一轮的反馈提供给agent
            input = `你上一步的操作导致了一个错误: ${error.message}. ，移动并没有成功执行，请尝试一个不同的移动。`;
        }
    }
}

if (require.main === module) {
    main();
}

