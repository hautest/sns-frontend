import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
