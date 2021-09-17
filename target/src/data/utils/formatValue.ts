import React from "react";

export function formatValue(value: string) {
  if (value) {
    value = value.toString().replace(".", ",");
    if (value.includes(",")) {
      if (value.length > 6)
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    } else {
      value = value + ",00";
      if (value.length > 6)
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    return `R$ ${value}`;
  }
  return "R$ 0,00";
}
