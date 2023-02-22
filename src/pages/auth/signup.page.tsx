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

export function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [adminToken, setAdminToken] = useState("");

    const signUp = async (
        email: string,
        password: string,
        adminToken: string
    ) => {
        if (!email || !password || !adminToken) return;

        try {
            await client.auth.signUp({
                email,
                password,
                adminToken,
            });
            toast.info("회원가입에 성공했어요!");
            navigate("/auth/signin");
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
                <H2>회원가입</H2>
                <TextField
                    placeholder="이메일"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="new-email"
                />
                <TextField
                    placeholder="비밀번호"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
                <TextField
                    placeholder="비밀번호 재입력"
                    value={password2}
                    type="password"
                    onChange={(e) => setPassword2(e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    placeholder="ADMIN_TOKEN"
                    value={adminToken}
                    type="password"
                    onChange={(e) => setAdminToken(e.target.value)}
                    autoComplete="off"
                />
                <Flex.Between style={{ width: "100%" }}>
                    <A as={Link} to="/auth/signin">
                        로그인
                    </A>
                    <Button
                        onClick={() => signUp(email, password, adminToken)}
                        disabled={
                            !email ||
                            !password ||
                            password !== password2 ||
                            !adminToken
                        }
                    >
                        회원가입
                    </Button>
                </Flex.Between>
            </CenterLayout>
        </>
    );
}
