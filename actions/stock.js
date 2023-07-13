export function get_current_stock(code, warehouse) {
    if (code && warehouse) {
      // Both code and warehouse are provided
      return `Current stock of item ${code} in warehouse ${warehouse}: ...`;
    } else if (code) {
      // Only code is provided
      return `Current stock of item ${code}: ...`;
    } else {
      // No arguments are provided
      return `Current stock of all items: ...`;
    }
  }
  