export function getFunctionCallString(response, functions) {
    if (response.additional_kwargs.function_call) {
      const functionName = response.additional_kwargs.function_call.name;
      const functionArguments = JSON.parse(response.additional_kwargs.function_call.arguments);
  
      // Find the called function in the functions array
      const calledFunction = functions.find((fn) => fn.name === functionName);
  
      // Check if all required arguments are present
      let missingArguments = [];
      if (calledFunction.parameters.needed.length > 0) {
        missingArguments = calledFunction.parameters.needed.filter(
          (arg) => !Object.keys(functionArguments).includes(arg)
        );
      }
  
      if (missingArguments.length > 0) {
        // Some required arguments are missing
        return `Missing required arguments for ${functionName}: ${missingArguments.join(", ")}`;
      } else {
        // All required arguments are present
        // Check if the provided arguments match the required and optional arguments
        let invalidArguments = [];
        const validArguments = [...calledFunction.parameters.needed, ...calledFunction.parameters.optional];
        if (validArguments.length > 0) {
          invalidArguments = Object.keys(functionArguments).filter(
            (arg) => !validArguments.includes(arg)
          );
        }
        if (invalidArguments.length > 0) {
          // Some provided arguments are invalid
          return `Invalid arguments provided: ${invalidArguments.join(", ")}`;
        } else {
          // All provided arguments are valid
          const functionCallString = `${functionName}(${Object.entries(functionArguments)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")})`;
  
          return `Function called is: ${functionCallString}`;
        }
      }
    } else {
      return "No matching function found for your prompt.";
    }
  }
