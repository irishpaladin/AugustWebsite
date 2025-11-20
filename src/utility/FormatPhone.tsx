export function formatPhone(num: string): string {
  // Remove all non-digits
  const digits = num.replace(/\D/g, "");

  if (digits.length !== 10) return num; // or throw an error

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6);

  return `(${part1}) ${part2} ${part3}`;
}