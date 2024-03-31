export default function checkExpense(description, amount, category) {
  if (!(description && amount && category)) {
    return "Todos os campos devem ser preenchidos";
  }

  if (!isNaN(amount)) {
    const num = parseFloat(amount);
    if (num <= 0) {
      return "Seu valor deve ser maior que 0";
    }
  } else {
    return "Seu valor deve ser um numero";
  }

  return null;
}
