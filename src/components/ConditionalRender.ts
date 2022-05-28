import { ReactElement } from "react";

interface ConditionalRenderInterface {
  condition: boolean;
  onTrue: ReactElement;
  onFalse?: ReactElement;
}

export const ConditionalRender = function ({
  condition,
  onTrue,
  onFalse,
}: ConditionalRenderInterface) {
  return condition ? onTrue : onFalse || null;
};
