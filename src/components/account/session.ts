import type {Role, UsersInterface} from "../../dataset/Users.tsx";

export interface SessionUser {
    id: number
    fullname: string
    email: string
    telephone: string
    role: Role
}

export interface SessionAuth {
    user: SessionUser
    remember: boolean
}

export const SESSION_STORAGE= "SESSION_STORAGE";
export const REGISTER_STORAGE = "REGISTER_STORAGE";

export function saveSession(user: SessionUser, remember = false): SessionAuth {
    const session: SessionAuth = {user, remember};
    try {
        sessionStorage.setItem(SESSION_STORAGE, JSON.stringify(session));
    } catch (e) {}

    return session;
}

export function getSession(): SessionAuth {
    try {
        const raw = sessionStorage.getItem(SESSION_STORAGE);
        if (!raw) return;

        const parsed = JSON.parse(raw);
        if (!parsed.user.id || !parsed.user.role) return null;
        return parsed;
    } catch (e) {return null;}
}

export function clearSession() {
    try {sessionStorage.removeItem(SESSION_STORAGE);}
    catch (e) {}
}

export function getRegisters(): UsersInterface[] {
    try {
        const raw = sessionStorage.getItem(REGISTER_STORAGE);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {return [];}
}

export function saveRegisters(user: UsersInterface[]): void {
    try {sessionStorage.setItem(REGISTER_STORAGE, JSON.stringify(user));}
    catch (e) {}
}