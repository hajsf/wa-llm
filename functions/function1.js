export function function1() {
    return {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          unit: { type: "string", enum: ["celsius", "fahrenheit"] },
        },
      // required: ["location"],
      args: ["location"],
      },
      function_call: {
        name: "get_current_weather",
      },
    };
  }