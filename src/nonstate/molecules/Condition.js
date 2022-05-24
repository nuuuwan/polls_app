export default function Condition({ condition, children }) {
  return condition ? children : null;
}
