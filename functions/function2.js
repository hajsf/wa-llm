export function function2() {
    return {
      name: "get_current_time",
      description: "Get the current time in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
        },
      // required: ["location"],
      args: ["location"],
      },
      function_call: {
        name: "get_current_time",
      },
    };
  }