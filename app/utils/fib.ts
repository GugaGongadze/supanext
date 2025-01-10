// fib
export function fibonnaci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonnaci(n - 1) + fibonnaci(n - 2);
}
