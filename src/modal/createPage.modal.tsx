import { trace } from "console";
import { APIResponseError } from "endpoint-client";
import { Button, Flex, H2, TextField, useModal } from "opize-design-system";
import { useState } from "react";
import { toast } from "react-toastify";
import { client } from "../client/client";
import { usePages } from "../hooks/usePages.hook";

export function CreatePageModal() {
    const modal = useModal();
    const [pageId, setPageId] = useState("");
    const pages = usePages();

    const createPage = async (pageId: string) => {
        try {
            await client.page.get({
                pageId,
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
            <H2>페이지 생성</H2>
            <TextField
                placeholder="페이지 ID"
                value={pageId}
                onChange={(e) => setPageId(e.target.value)}
            />
            <Button disabled={!pageId} onClick={() => createPage(pageId)}>
                생성
            </Button>
        </Flex.Column>
    );
}
