import { APIResponseError } from "endpoint-client";
import {
    ActionMenu,
    BoxLayout,
    Button,
    Callout,
    Table,
    useDialog,
    useModal,
} from "opize-design-system";
import {
    ArrowClockwise,
    DotsThreeVertical,
    Pen,
    PencilSimple,
    TrashSimple,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { client } from "../../client/client";
import { PageObject } from "../../client/object/page.object";
import { Header } from "../../components/header";
import { usePages } from "../../hooks/usePages.hook";
import { PatchPageModal } from "../../modal/patchPage.modal";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

function PageRow({ page }: { page: PageObject }) {
    const pages = usePages();
    const modal = useModal();
    const dialog = useDialog();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refresh = async () => {
        try {
            setIsRefreshing(true);
            await client.page.patch({
                pageId: page.pageId,
                reCaching: true,
            });
            await pages.refetch();
            setIsRefreshing(false);
        } catch (err) {
            setIsRefreshing(false);
            if (err instanceof APIResponseError) {
                toast.error("서버가 알 수 없는 응답을 반환했어요.");
                console.error(err);
            } else {
                toast.error("서버에 연결할 수 없어요");
                console.error(err);
            }
        }
    };

    const deletePage = async () => {
        try {
            await client.page.delete({
                pageId: page.pageId,
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

    const deletePageDialog = async () => {
        dialog({
            title: "정말로 페이지를 삭제하시겠어요?",
            content: "삭제한 페이지의 데이터는 되돌릴 수 없어요.",
            buttons: [
                {
                    children: "취소",
                    onClick: () => {},
                },
                {
                    children: "삭제",
                    color: "red",
                    variant: "contained",
                    onClick: () => deletePage(),
                },
            ],
        });
    };

    return (
        <Table.Row>
            <Table.Data width="300px">{page.pageId}</Table.Data>
            <Table.Data>{page.pageCode}</Table.Data>
            <Table.Data>{page.domain}</Table.Data>
            <Table.Data>{dayjs(page.cachedAt).fromNow()}</Table.Data>
            <Table.Data $align="flex-end" width="100px">
                <Button
                    icon={<ArrowClockwise />}
                    variant="text"
                    isLoading={isRefreshing}
                    onClick={() => refresh()}
                />
                <ActionMenu
                    actions={[
                        [
                            {
                                label: "수정",
                                icon: <PencilSimple />,
                                onClick: () =>
                                    modal.open(<PatchPageModal page={page} />),
                            },
                            {
                                label: "삭제",
                                icon: <TrashSimple />,
                                onClick: () => deletePageDialog(),
                                color: "red",
                            },
                        ],
                    ]}
                    icon={<DotsThreeVertical />}
                    variant="text"
                />
            </Table.Data>
        </Table.Row>
    );
}

export function AppPage() {
    const { pages } = usePages();
    const [page, setPage] = useState(1);

    return (
        <>
            <Header />
            <BoxLayout marginTop="64px">
                <Table>
                    <Table.THead>
                        <Table.Row>
                            <Table.Head width="300px">아이디</Table.Head>
                            <Table.Head>코드</Table.Head>
                            <Table.Head>도메인</Table.Head>
                            <Table.Head>캐싱</Table.Head>
                            <Table.Head width="100px"></Table.Head>
                        </Table.Row>
                    </Table.THead>
                    <Table.TBody>
                        {pages?.map((page) => (
                            <PageRow page={page} key={page.pageId} />
                        ))}
                    </Table.TBody>
                </Table>
            </BoxLayout>
        </>
    );
}
