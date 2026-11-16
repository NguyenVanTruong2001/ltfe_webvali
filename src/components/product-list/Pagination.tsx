import {Link} from "react-router-dom";

interface PaginationProps {
    page: number
    totalPages: number
    searchFor: (page: number) => string
}

export default function Pagination({page, totalPages, searchFor}: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav className="pagination" aria-label="Phân trang">
            <ul className="pageList">
                <li>
                    {page > 1 ? (
                        <Link to={{search: searchFor(page - 1)}} className="pageBtn">
                            <svg className="icon iconSm" aria-hidden="true"><use href="#iChevLeft" /></svg>
                            Trước
                        </Link>
                    ) : (
                        <span className="pageBtn isDisabled" aria-disabled="true">
                            <svg className="icon iconSm" aria-hidden="true"><use href="#iChevLeft" /></svg>
                            Trước
                        </span>
                    )}
                </li>
                {Array.from({length: totalPages}, (_, index) => index + 1).map((number) => (
                    <li key={number}>
                        <Link
                            to={{search: searchFor(number)}}
                            className={number === page ? "pageBtn isCurrent" : "pageBtn"}
                            aria-current={number === page ? "page" : undefined}
                        >
                            {number}
                        </Link>
                    </li>
                ))}
                <li>
                    {page < totalPages ? (
                        <Link to={{search: searchFor(page + 1)}} className="pageBtn">
                            Sau
                            <svg className="icon iconSm" aria-hidden="true"><use href="#iChevRight" /></svg>
                        </Link>
                    ) : (
                        <span className="pageBtn isDisabled" aria-disabled="true">
                            Sau
                            <svg className="icon iconSm" aria-hidden="true"><use href="#iChevRight" /></svg>
                        </span>
                    )}
                </li>
            </ul>
        </nav>
    );
}
