import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Flip, ToastContainer } from "react-toastify";
import { OpizeWrapper } from "opize-design-system";

import "./App.css";
import "opize-design-system/dist/style/font.css";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./pages/router";
import { PageContextProvider } from "./context/pages.context";

const queryClient = new QueryClient();
function App() {
    return (
        <div className="App">
            <PageContextProvider>
                <OpizeWrapper>
                    <QueryClientProvider client={queryClient}>
                        <Router />
                    </QueryClientProvider>
                </OpizeWrapper>
            </PageContextProvider>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                transition={Flip}
            />
        </div>
    );
}

export default App;
