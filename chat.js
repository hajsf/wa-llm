//import * as dotenv from "dotenv";
//dotenv.config();

import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { myfunctions } from "./myfunctions.js";
import { getFunctionCallString } from "./getFunction.js";
import { callFunction } from "./call.js";
//import * as readlineSync from "readline-sync";
import readline from 'readline';

const functions = Object.values(myfunctions).map((fn) => fn());

const rl = readline.createInterface({
    input: process.stdin,
  //  output: process.stdout
});

const GPTchat = new ChatOpenAI({
    openAIApiKey:Bun.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo-0613", //"gpt-4-0613",
    temperature: 0.9,
});

const model = new OpenAI({
  openAIApiKey:Bun.env.OPENAI_API_KEY,
  streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token) {
        process.stdout.write(token.replace(/^\n/, ""));
        return token.replace(/^\n/, "");
      },
    },
  ],
});

let conversationHistories = {};
async function converse(prompt, senderId) {
    if (!conversationHistories[senderId]) {
        conversationHistories[senderId] = "";
    }
    let conversationHistory = conversationHistories[senderId];
    conversationHistory += `User: ${prompt}\nLangChain: `;
    const response = await model.call(conversationHistory);
    conversationHistory += response + "\n";
    conversationHistories[senderId] = conversationHistory;
    return response;
}

export async function chat(prompt, senderId) {
      const humanMessage = new HumanMessage(prompt);
      const response = await GPTchat.predictMessages([humanMessage], {
        functions,
      });
      const functionCallString = getFunctionCallString(response, functions);
      if(functionCallString != "No matching function found for your prompt.") {
        const response = callFunction(functionCallString);
        return response;
      } else {
        const response = await converse(prompt, senderId);
        return response;       
      }
}