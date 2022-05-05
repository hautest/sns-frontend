import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme, GlobalStyle } from "./styles";
import { MainPageUnLogIn } from "./page/MainPageUnLogIn";
import { SignUp } from "./page/SignUp/SignUp";
import { GlobalLayout } from "./components";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GlobalLayout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPageUnLogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </GlobalLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
