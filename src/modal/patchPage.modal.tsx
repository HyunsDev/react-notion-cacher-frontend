import { APIResponseError } from "endpoint-client";
import {
    Button,
    Checkbox,
    Flex,
    H2,
    TextField,
    useModal,
} from "opize-design-system";
import { useState } from "react";
import { toast } from "react-toastify";
import { client } from "../client/client";
import { PageObject } from "../client/object/page.object";
import { usePages } from "../hooks/usePages.hook";

export function PatchPageModal({ page }: { page: PageObject }) {
    const modal = useModal();
    const pages = usePages();

    const [pageCode, setPageCode] = useState(page.pageCode || "");
    const [pageDomain, setPageDomain] = useState(page.domain || "");
    const [isLazyReCaching, setIsLazyReCaching] = useState(false);

    const patch = async () => {
        try {
            await client.page.patch({
                pageId: page.pageId,
                pageCode,
                domain: pageDomain,
                lazyReCaching: isLazyReCaching,
            });
            await pages.refetch();
            modal.close();
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error("서버가 알 수 없는 응답을 반환했어요.");
                console.error(err);
            } else {
                toast.error("서버에 연결할 수 없어요");
                console.error(err);
            }
        }
    };

    return (
        <Flex.Column gap="8px">
            <H2>페이지 수정</H2>
            <TextField
                label="페이지 코드"
                value={pageCode}
                onChange={(e) => setPageCode(e.target.value)}
            />
            <TextField
                label="페이지 도메인"
                value={pageDomain}
                onChange={(e) => setPageDomain(e.target.value)}
            />
            <Checkbox
                text="LazyReCaching"
                checked={isLazyReCaching}
                onChange={(e) => setIsLazyReCaching(!isLazyReCaching)}
            />
            <Button onClick={() => patch()}>적용</Button>
        </Flex.Column>
    );
}
