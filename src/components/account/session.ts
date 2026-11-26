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
interface SessionStore {
    currentSession: SessionAuth | null;
    registeredUsers: UsersInterface[];
}

function readStore(): SessionStore {
    try {
        const raw = sessionStorage.getItem(SESSION_STORAGE);
        if (!raw) {
            return { currentSession: null, registeredUsers: [] };
        }
        const parsed = JSON.parse(raw) as SessionStore | null;
        return {
            currentSession: parsed?.currentSession ?? null,
            registeredUsers: Array.isArray(parsed?.registeredUsers) ? parsed.registeredUsers : [],
        };
    } catch {
        return { currentSession: null, registeredUsers: [] };
    }
}

function writeStore(store: SessionStore): void {
    try {
        sessionStorage.setItem(SESSION_STORAGE, JSON.stringify(store));
    } catch {
        // Bỏ qua nếu trình duyệt chặn sessionStorage
    }
}

export function saveSession(user: SessionUser, remember = false): SessionAuth {
    const session: SessionAuth = { user, remember };
    const store = readStore();
    writeStore({ ...store, currentSession: session });
    return session;
}

export function getSession(): SessionAuth | null {
    const { currentSession } = readStore();
    if (!currentSession?.user?.id || !currentSession?.user?.role) {
        return null;
    }
    return currentSession;
}

export function clearSession(): void {
    const store = readStore();
    writeStore({ ...store, currentSession: null });
}

export function getRegisters(): UsersInterface[] {
    return readStore().registeredUsers;
}

export function saveRegisters(users: UsersInterface[]): void {
    const store = readStore();
    writeStore({ ...store, registeredUsers: users });
}