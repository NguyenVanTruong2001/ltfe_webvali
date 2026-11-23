import {isRouteErrorResponse, Link, useRouteError} from "react-router";

export default function ErrorPage() {
    const error = useRouteError();
    const notFound = isRouteErrorResponse(error) && error.status === 404;

    return (
        <main id="noiDung" className="container">
            <p className="emptyTitle">{notFound ? "Không tìm thấy trang" : "Đã xảy ra lỗi"}</p>
            {!notFound && error instanceof Error && <p>{error.message}</p>}
            <Link to="/" className="textLink">Về trang chủ</Link>
        </main>
    );
}
