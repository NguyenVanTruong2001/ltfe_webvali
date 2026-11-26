import type {Role, UsersInterface} from "../../dataset/Users.tsx";
import {UsersData} from "../../dataset/Users.tsx";
import type {SessionAuth, SessionUser} from "./session.ts";
import {getRegisters, saveRegisters, saveSession} from "./session.ts";


export interface LogInPayload {
    identifier: string;
    password: string;
    isRemembered: boolean
}

export interface RegisterPayload {
    fullname: string;
    email: string;
    phone: string;
    password: string;
    remember?: boolean;
}

export interface AuthResult {
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

export function getAllUsers(): UsersInterface[] {
    return [...UsersData, ...getRegisters()];
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

export function logIn({identifier, password, isRemembered = false}: LogInPayload): AuthResult {
    const cleanEmail = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/[\s.-]/g, "").trim();
    const allUsers = getAllUsers();
    const matchedUser = allUsers.find(
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

export function register({fullname, email, phone, password, remember = false}: RegisterPayload): AuthResult {
    const cleanName = fullname.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/[\s.-]/g, "").trim();

    const allUsers = getAllUsers();

    const existedByEmail = allUsers.some((u) => u.email.toLowerCase() === cleanEmail);
    if (existedByEmail) {
        return {
            isSuccess: false,
            message: "Email này đã được sử dụng cho tài khoản khác.",
        };
    }

    const existedByPhone = allUsers.some((u) => u.telephone === cleanPhone);
    if (existedByPhone) {
        return {
            isSuccess: false,
            message: "Số điện thoại này đã được đăng ký.",
        };
    }

    const maxId = allUsers.reduce((max, u) => (u.id > max ? u.id : max), 0);

    const newUser: UsersInterface = {
        id: maxId + 1,
        fullname: cleanName,
        email: cleanEmail,
        telephone: cleanPhone,
        password,
        role: "User",
    };

    const updatedRegistered = [...getRegisters(), newUser];
    saveRegisters(updatedRegistered);

    const session = saveSession(toSessionUser(newUser), remember);

    return {
        isSuccess: true,
        session,
        redirection: getRedirectPathByRole(newUser.role),
    };
}