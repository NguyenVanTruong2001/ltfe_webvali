import {Navigate, useLocation} from "react-router";

export default function Redirect({pathname}: {pathname: string}) {
    const {search} = useLocation();
    return <Navigate to={{pathname, search}} replace />;
}
