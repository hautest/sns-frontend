import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";

import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./styles";
import { MainPage } from "./page/MainPage";
import { SignUp } from "./page/SignUp";
import { MyInformationPage } from "./page/MyInformation";
import { GlobalLayout } from "./components";
import { Login } from "./page/Login/Login";
import { axiosInstance } from "./utils";
import { userAtom } from "./store";

function App() {
  const { mutate } = useMutation(
    (refreshToken: string) => {
      return axiosInstance.post(`/auth/access-token`, { refreshToken });
    },
    {
      onSuccess: (data) => {
        setUserData(data.data);
        localStorage.setItem("refreshToken", data.data.refreshToken);
      },
    }
  );
  const setUserData = useSetRecoilState(userAtom);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!!refreshToken) {
      mutate(refreshToken);
    }
  }, [mutate]);

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
