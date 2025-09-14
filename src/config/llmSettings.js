const OpenAI = require('openai');

function getModelClient() {
    const client = new OpenAI({
        apiKey: "sk-ff076586f010445c99ad07950bd99e89",
        baseURL: "https://api.deepseek.com/v1",
    });

    return {
        client,
        model: "deepseek-chat",
        model_info: {
            "name": "deepseek-chat",
            "parameters": {
                "max_tokens": 2048,
                "temperature": 0.4,
                "top_p": 0.9,
            },
            "family": "gpt-4o",
            "vision": false,
            "json_output": true,
            "function_calling": true
        }
    };
}

module.exports = { getModelClient };
