export function spacing(level: number) {
  return Array.from({ length: level })
    .map(() => "  ")
    .join("");
}
