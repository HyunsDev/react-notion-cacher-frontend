import { BoxLayout, Callout } from "opize-design-system";
import { Header } from "../components/header";
import { Link } from "react-router-dom";

export function IndexPage() {
    return (
        <>
            <Header />
            <BoxLayout marginTop="64px">
                <Callout icon="💡">아직 메인 페이지를 작성하고 있어요.</Callout>
                <Link to={"/app"}>앱으로 이동</Link>
            </BoxLayout>
        </>
    );
}
