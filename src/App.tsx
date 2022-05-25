import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme, GlobalStyle } from "./styles";
import { MainPage } from "./page/MainPage";
import { SignUp } from "./page/SignUp";
import { MyInformationPage } from "./page/MyInformation";
import { GlobalLayout } from "./components";
import { Login } from "./page/Login";
import { requestToken } from "./store/slice/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const pastRefreshToken = localStorage.getItem("refreshToken");
    if (!!pastRefreshToken) {
      dispatch(requestToken(pastRefreshToken));
    }
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <GlobalLayout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-information" element={<MyInformationPage />} />
            </Routes>
          </GlobalLayout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
