import { Endpoint } from "endpoint-client";

// POST /auth/signin
export type PostAuthSignInParameter = {
    email: string;
    password: string;
};
export type PostAuthSignInResponse = {
    accessToken: string;
};
export const PostAuthSignIn: Endpoint<
    PostAuthSignInParameter,
    PostAuthSignInResponse
> = {
    method: "POST",
    path: "/auth/signin",
    bodyParams: ["email", "password"],
};

// POST /auth/signup
export type PostAuthSignUpParameter = {
    email: string;
    password: string;
    adminToken: string;
};
export type PostAuthSignUpResponse = {};
export const PostAuthSignUp: Endpoint<
    PostAuthSignUpParameter,
    PostAuthSignUpResponse
> = {
    method: "POST",
    path: "/auth/signup",
    bodyParams: ["adminToken", "email", "password"],
};

// DELETE /auth/account
export type DeleteAuthAccountParameter = {};
export type DeleteAuthAccountResponse = {};
export const DeleteAuthAccount: Endpoint<
    DeleteAuthAccountParameter,
    DeleteAuthAccountResponse
> = {
    method: "DELETE",
    path: "/auth/account",
};
