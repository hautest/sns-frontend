export function ConditionalRender({ condition, onTrue, onFalse }) {
  return condition ? onTrue : onFalse;
}
