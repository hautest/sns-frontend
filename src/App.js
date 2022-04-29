import { Button } from "./components/Button";
import { GlobalFontFamily } from "./styleData/GlobalFontFamily";
import { ThemeProvider } from "styled-components";
import { theme } from "./styleData/Theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalFontFamily />
        <Button size={"lg"}>
          <div>Button</div>
        </Button>
        <Button size={"md"} />
        <Button size={"sm"} />
        <Button size={"xs"} />
        <hr></hr>
        <Button size={"lg"} disabled />
        <Button size={"md"} disabled />
        <Button size={"sm"} disabled />
        <Button size={"xs"} disabled />
      </ThemeProvider>
    </>
  );
}

export default App;
