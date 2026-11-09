export default function Breadcrumb() {
    return (
        <nav className="breadcrumb" aria-label="Đường dẫn">
            <ol>
                <li>
                    <a href="../index.html">Trang chủ</a>
                </li>
                <li aria-current="page">Vali</li>
            </ol>
        </nav>
    );
}
