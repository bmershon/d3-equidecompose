export default function(actual, expected, epsilon) {
  return actual < expected + epsilon && actual > expected - epsilon;
}