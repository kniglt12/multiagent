const hanoiTask = `
请帮我完成如下的**汉诺塔(Tower of Hanoi)游戏**:
---

## 汉诺塔游戏规则

### 一、游戏目标

将所有圆盘从**起始柱子(A柱)**移动到**目标柱子(C柱)**，并保持圆盘的原始顺序（大盘在下，小盘在上）。

---

### 二、游戏组成

1. **三根柱子**:依次为 A 柱、B 柱 和 C 柱。
2. **4 个大小不一的圆盘**：圆盘大小依次不同，最小的在最上方，最大的在最下方，初始时全部置于 A 柱， 根据圆盘大小， 四个圆盘依次从小到大编号为 1，2，3，4。

---

### 三、移动规则

1. **一次只能移动一个圆盘**。
2. **任何时候不能将较大的圆盘放在较小的圆盘上面**。
3. 每次移动时，只能从某一根柱子的最顶端取一个圆盘，放置到另一根柱子的顶端。

---

### 四、游戏玩法说明

* 初始状态：所有圆盘从上到下按大小顺序排列在 A 柱。
* 目标状态：所有圆盘按相同顺序转移到 C 柱。
* B 柱是辅助柱，可以暂时存放圆盘以帮助移动。
* 这是一个交互式的游戏，你每次可以执行一次移动操作，并收到我关于操作成功与否的反馈，直到你完成整个游戏

---

### 五、输入输出规则

1. **输出**: 你需要在输出的最后一行给出这次移动的指令，格式为 "move N from X to Y"，其中 X 和 Y 是 A、B、C 三柱子之一， N 是 1，2，3，4 四圆盘之一。
2. **输入**: 每次移动后，我会告诉你是否成功移动圆盘，在你指令合法时也有概率发生“指令接收失败”错误，这是正常的，当这种情况发生时，你只需要重新发送同样的指令，再次进行移动尝试即可。
3. **完成游戏**: 当所有圆盘成功从 A 柱移动到 C 柱时，游戏结束，当你认为游戏已经结束时，请输出 “游戏已经完成”。
请开始游戏。

### 六、输出格式

你输出的最后一行必须严格遵循以下格式（不允许任何 markdown 符号）：
move N from X to Y
`;

let hanoiState = {
    'A': [4, 3, 2, 1],
    'B': [],
    'C': []
};

function hanoiInput(result) {
    const lines = result.split('\n');
    const moveLine = lines[lines.length - 1].trim();
    if (moveLine.startsWith("move")) {
        const parts = moveLine.split(' ');
        if (parts.length === 6 && parts[0] === "move") {
            const disk = parseInt(parts[1]);
            const fromPole = parts[3];
            const toPole = parts[5];

            if (["A", "B", "C"].includes(fromPole) && ["A", "B", "C"].includes(toPole) && [1, 2, 3, 4].includes(disk)) {
                if (hanoiState[fromPole].length > 0 && hanoiState[fromPole][hanoiState[fromPole].length - 1] === disk) {
                    if (hanoiState[toPole].length === 0 || hanoiState[toPole][hanoiState[toPole].length - 1] > disk) {
                        let rand = Math.floor(Math.random() * 10);
                        rand = 1;
                        if (rand < 8) {
                            hanoiState[fromPole].pop();
                            hanoiState[toPole].push(disk);
                            return `移动成功，圆盘 ${disk} 从 ${fromPole} 移动到了 ${toPole}。`;
                        } else {
                            return `指令接收失败，请重新发送上一指令。`;
                        }
                    } else {
                        throw new Error(`圆盘 ${disk} 不能放在柱子 ${toPole} 的顶部。`);
                    }
                } else {
                    throw new Error(`圆盘 ${disk} 不在柱子 ${fromPole} 的顶部。`);
                }
            } else {
                throw new Error("结果中的移动指令无效: " + result);
            }
        } else {
            throw new Error("结果中的移动指令无效: " + result);
        }
    } else {
        throw new Error("结果中的移动指令无效: " + result);
    }
}

module.exports = { hanoiTask, hanoiState, hanoiInput };
