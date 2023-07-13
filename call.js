// calls.js

// ./call.js
import { myactions } from "./myactions.js";

export function callFunction(functionCallString) {
  // Extract the function name and arguments from the functionCallString
  const functionName = functionCallString.match(/Function called is: (\w+)\(/)[1];
  let functionArguments = [];
  if (functionCallString.includes("(") && functionCallString.includes(")")) {
    const argsString = functionCallString.match(/\(([^)]+)\)/);
    if (argsString) {
      functionArguments = argsString[1]
        .split(", ")
        .map((arg) => arg.split(": ")[1]);
    }
  }
  // Call the corresponding function with the extracted arguments
  if (functionName in myactions) {
    const result = myactions[functionName](...functionArguments);
    return result; //console.log(result); //
  }
  return
}
