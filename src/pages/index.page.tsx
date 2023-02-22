import { BoxLayout, Callout } from "opize-design-system";
import { Header } from "../components/header";

export function IndexPage() {
    return (
        <>
            <Header />
            <BoxLayout marginTop="64px" width="900px">
                <Callout icon="💡">아직 메인 페이지를 작성하고 있어요.</Callout>
            </BoxLayout>
        </>
    );
}
