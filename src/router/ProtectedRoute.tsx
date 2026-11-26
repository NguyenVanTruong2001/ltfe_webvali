import type {Role} from "../dataset/Users.tsx";
import React from "react";
import {getSession} from "../components/account/session.ts";
import {Navigate, useLocation} from "react-router";
import {getRedirectPathByRole} from "../components/account/authentication.ts";

export interface ProtectedRouteProps {
    allowedRoles?: Role[];
    loginPath?: string;
    unauthorizedPath?: string;
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps>
    = ({
           allowedRoles,
           loginPath = "/login",
           unauthorizedPath,
           children,
       }) => {
    const location = useLocation();
    const session = getSession();

    if (!session || !session.user) {
        return (
            <Navigate
                to={loginPath}
                replace
                state={{from: location.pathname + location.search}}
            />
        );
    }

    const currentRole = session.user.role;

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
        const fallbackPath = unauthorizedPath ?? getRedirectPathByRole(currentRole);
        return (<Navigate to={fallbackPath} replace />);
    }

    return (<>{children}</>);
};

export default ProtectedRoute;