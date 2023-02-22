import { Endpoint } from "endpoint-client";
import { PageObject } from "../object/page.object";

// GET /page
export type GetPageParameter = {
    pageId?: string;
    pageCode?: string;
    domain?: string;
};
export type GetPageResponse = PageObject;
export const GetPage: Endpoint<GetPageParameter, GetPageResponse> = {
    method: "GET",
    path: "/page",
    queryParams: ["domain", "pageCode", "pageId"],
};

// GET /pages
export type GetPagesParameter = {
    page?: number;
};
export type GetPagesResponse = {
    pages: PageObject[];
    page: number;
};
export const GetPages: Endpoint<GetPagesParameter, GetPagesResponse> = {
    method: "GET",
    path: "/pages",
    queryParams: ["page"],
};

// PATCH /pages/:pageId
export type PatchPageParameter = {
    pageId: string;
    pageCode?: string;
    domain?: string;
    reCaching?: boolean;
    lazyReCaching?: boolean;
};
export type PatchPageResponse = {};
export const PatchPage: Endpoint<PatchPageParameter, PatchPageResponse> = {
    method: "PATCH",
    path: (e) => `/pages/${e.pageId}`,
    bodyParams: ["domain", "lazyReCaching", "pageCode", "reCaching"],
};

// DELETE /pages/:pageId
export type DeletePageParameter = {
    pageId: string;
};
export type DeletePageResponse = {};
export const DeletePage: Endpoint<DeletePageParameter, DeletePageResponse> = {
    method: "DELETE",
    path: (e) => `/pages/${e.pageId}`,
};
