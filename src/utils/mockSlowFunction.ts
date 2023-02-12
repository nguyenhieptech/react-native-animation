export function mockSlowFunction(number: number) {
  for (let i = 0; i < 1_000_000; i++) {
    number++;
  }
}
