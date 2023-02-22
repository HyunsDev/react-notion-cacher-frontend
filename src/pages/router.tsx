import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppPage } from "./app/index.page";
import { IndexPage } from "./index.page";
import { SignInPage } from "./auth/signin.page";
import { SignUpPage } from "./auth/signup.page";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/auth/signin" element={<SignInPage />} />
                <Route path="/auth/signup" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    );
}
