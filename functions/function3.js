export function function3() {
    return {
      name: "get_current_stock",
      description: "Get the current stock, the user may inquire about overall stock or abbout a given item code as overall or at a specific location or warehouse code",
      parameters: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "The code of the item, e.g. ABC",
          },
          warehouse: {
            type: "string",
            description: "The warehouse or storage location of the item, e.g. Dammam, Khobar, ..",
          },
        },
        // required: ["location"],
        needed: [],
        optional: ["code", "warehouse"],
      },
      function_call: {
        name: "get_current_stock",
      },
    };
  }
  