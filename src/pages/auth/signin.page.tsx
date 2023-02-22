import axios, { AxiosError } from "axios";
import {
    BoxLayout,
    Button,
    Callout,
    CenterLayout,
    Flex,
    H2,
    Link as A,
    TextField,
} from "opize-design-system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { client } from "../../client/client";
import { Header } from "../../components/header";

export function SignInPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async (email: string, password: string) => {
        if (!email || !password) return;

        try {
            const res = await client.auth.signIn({
                email,
                password,
            });
            localStorage.setItem("token", res.accessToken);
            navigate("/app");
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 404) {
                    toast.warn("계정을 찾을 수 없어요.");
                } else if (err.response?.status === 400) {
                    toast.warn("비밀번호가 틀렸어요.");
                } else {
                    toast.error(
                        `서버가 알 수 없는 응답을 보냈어요. ${err.response?.status}`
                    );
                    console.error(err);
                }
            } else {
                toast.error("서버 연결에 실패했어요.");
                console.error(err);
            }
        }
    };

    return (
        <>
            <Header />
            <CenterLayout
                marginTop="64px"
                width="350px"
                minHeight="calc(100vh - 64px)"
            >
                <H2>로그인</H2>
                <TextField
                    placeholder="이메일"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    placeholder="비밀번호"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Flex.Between style={{ width: "100%" }}>
                    <A as={Link} to="/auth/signup">
                        회원가입
                    </A>
                    <Button
                        onClick={() => signIn(email, password)}
                        disabled={!email || !password}
                    >
                        로그인
                    </Button>
                </Flex.Between>
            </CenterLayout>
        </>
    );
}
