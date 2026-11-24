import type {Role, UsersInterface} from "../../dataset/Users.tsx";
import {UsersData} from "../../dataset/Users.tsx";
import type {SessionAuth, SessionUser} from "./session.ts";
import {clearSession, saveSession} from "./session.ts";

export interface LogInPayload {
    identifier: string;
    password: string;
    isRemembered: boolean
}

export interface LogInResult {
    isSuccess: boolean;
    message?: string;
    session?: SessionAuth;
    redirection?: string;
}

const REDIRECT_MAP: Record<Role, string> = {
    Admin: "/dashboard",
    User: "/"
};

export function getRedirectPathByRole(role: Role) {
    return REDIRECT_MAP[role] ?? "/";
}

function toSessionUser(user: UsersInterface): SessionUser {
    return {
        id: user.id,
        fullname: user.fullname,
        telephone: user.telephone,
        email: user.email,
        role: user.role
    };
}

export function logIn({identifier, password, isRemembered = false}: LogInPayload): LogInResult {
    const cleanEmail = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/[\s.-]/g, "").trim();
    const matchedUser = UsersData.find(
        (u) =>
            u.email.toLowerCase() === cleanEmail || u.telephone === cleanPhone
    );

    if (!matchedUser) {
        return {
            isSuccess: false,
            message: "Tài khoản không tồn tại trên hệ thống."
        }
    }

    if (matchedUser.password !== password) {
        return {
            isSuccess: false,
            message: "Mật khẩu không chính xác."
        }
    }

    const session = saveSession(toSessionUser(matchedUser), isRemembered);
    return {
        isSuccess: true,
        session: session,
        redirection: getRedirectPathByRole(matchedUser.role)
    };
}

export function logOut() {
    clearSession();
}