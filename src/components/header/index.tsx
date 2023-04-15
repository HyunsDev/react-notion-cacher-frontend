import {
    Button,
    Flex,
    Header as OpizeHeader,
    SimpleHeader,
    Text,
    useModal,
} from "opize-design-system";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CreatePageModal } from "../../modal/createPage.modal";

const LogoDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: "Poppins", sans-serif;
`;
const LogoText = styled.h1`
    font-size: 16px;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    color: #2d6560;
`;
const LogoImg = styled.img`
    height: 20px;
`;

export function Header() {
    const navigate = useNavigate();
    const modal = useModal();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/auth/signin");
    };

    const createPage = () => {
        modal.open(<CreatePageModal />);
    };

    return (
        <SimpleHeader>
            <LogoDiv>
                <LogoImg src="/assets/logo.png" />
                <LogoText>React Notion Cacher</LogoText>
            </LogoDiv>
            {!localStorage.getItem("token") && (
                <Button onClick={() => navigate("/auth/signin")}>로그인</Button>
            )}

            <Flex.Row gap="8px">
                {localStorage.getItem("token") && (
                    <Button onClick={() => logout()} variant="text">
                        로그아웃
                    </Button>
                )}

                {localStorage.getItem("token") && (
                    <Button variant="contained" onClick={createPage}>
                        페이지 생성
                    </Button>
                )}
            </Flex.Row>
        </SimpleHeader>
    );
}
