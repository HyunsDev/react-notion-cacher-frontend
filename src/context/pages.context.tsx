import { APIResponseError } from "endpoint-client";
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { toast } from "react-toastify";
import { client } from "../client/client";
import { PageObject } from "../client/object/page.object";

export interface PagesContextProps {
    pages: PageObject[];
    page: number;
    fetch: (page: number) => Promise<void>;
    refetch: () => Promise<void>;
}

export const PagesContext = createContext<PagesContextProps>({
    page: 1,
    pages: [],
    fetch: async () => {},
    refetch: async () => {},
});

export function PageContextProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [pages, setPages] = useState<PageObject[]>([]);
    const [page, setPage] = useState(1);

    const fetch = useCallback(async (page: number) => {
        console.log("캐싱");
        try {
            const res = await client.page.list({
                page,
            });
            setPages(res.pages);
            setPage(page);
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error("서버가 알 수 없는 응답을 반환했어요.");
                console.error(err);
            } else {
                toast.error("서버에 연결할 수 없어요");
                console.error(err);
            }
        }
    }, []);

    const refetch = useCallback(async () => {
        console.log("리캐싱");
        try {
            const res = await client.page.list({
                page,
            });
            setPages(res.pages);
            setPage(page);
        } catch (err) {
            if (err instanceof APIResponseError) {
                toast.error("서버가 알 수 없는 응답을 반환했어요.");
                console.error(err);
            } else {
                toast.error("서버에 연결할 수 없어요");
                console.error(err);
            }
        }
    }, [page]);

    useEffect(() => {
        (async () => {
            await fetch(1);
        })();
    }, [fetch]);

    const value = useMemo(
        () => ({
            page: page,
            pages: pages,
            fetch: fetch,
            refetch: refetch,
        }),
        [fetch, page, pages, refetch]
    );

    return (
        <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
    );
}
