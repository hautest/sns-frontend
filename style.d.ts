import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors:
      | black
      | gray1
      | gray2
      | gray3
      | gray4
      | gray5
      | gray6
      | primary
      | warn
      | white
      | success
      | hoverColor;

    spacing: xs | sm | md | lg | xl;
  }
}
