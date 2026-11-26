import {useEffect, useState} from "react";
import {getSession} from "../account/session.ts";

export default function Dashboard() {
    const [session, setSession] = useState(() => getSession())
    useEffect(() => {
        setSession(getSession)
    }, []);

    return (
        <>
            {session ? (
                <>
                    {session.user.role === "Admin" ? (
                        <>
                            <h1>ADMIN PAGE</h1>
                        </>
                    ) : (<></>)}
                </>
            ) : (<></>)}
        </>
    );
}