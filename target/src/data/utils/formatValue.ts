export function formatValue(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}

export function formatCurrency(value = "") {
  try {
    let tmp = value + "";
    const isNegativeValue = tmp.indexOf("-") != -1;
    tmp = tmp.replace(/\D/g, "");
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    if (isNegativeValue && tmp) tmp = "-" + tmp;
    return tmp ? "R$ " + tmp : isNegativeValue ? "R$ -" : "";
  } catch (e) {
    return "R$ 0,00";
  }
}

export function formatValueToSave(value = "") {
  try {
    let tmp = value + "";
    tmp = tmp.substring(0, tmp.length - 3);
    return tmp;
  } catch (e) {
    return "0";
  }
}
