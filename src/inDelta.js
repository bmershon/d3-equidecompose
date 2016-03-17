export default function inDelta(actual, expected, epsilon) {
  return actual < expected + epsilon && actual > expected - epsilon;
}