import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {Link} from "react-router";
import {Newsletter, NewsCategory} from "../../dataset/News.tsx";
import NewsItem from "./News-Item.tsx";
import {useState, useMemo} from "react";

export default function News() {
    const [activeTopic, setActiveTopic] = useState(NewsCategory[0].category);
    const filteredNews = useMemo(() => {
        if (activeTopic === "all") return Newsletter;
        else return Newsletter.filter((topic: any) => topic.category === activeTopic);
    }, [activeTopic]);

    return (
        <>
            <PageHeader />
            <main id="noiDung">
                <div className="container">
                    <nav className="breadcrumb" aria-label="Đường dẫn">
                        <ol>
                            <li>
                                <Link to="/">Trang chủ</Link>
                            </li>
                            <li aria-current="page">Tin tức</li>
                        </ol>
                    </nav>
                    <div className="checkoutHead">
                        <h1 className="checkoutTitle">Tin tức</h1>
                        <p className="newsIntro">Mẹo chọn vali, kinh nghiệm du lịch và đánh giá sản phẩm từ đội ngũ Valigo.</p>
                    </div>
                    <div className="newsTabs" role="group" aria-label="Chủ đề bài viết">
                        {NewsCategory.map((category: any) => (
                            <button
                                key={category.id}
                                type="button"
                                className={category.category === activeTopic ? "newsTab isActive" : "newsTab"}
                                data-topic={activeTopic}
                                aria-pressed={activeTopic}
                                onClick={() => setActiveTopic(category.category)}
                            >
                                {category.topic}
                            </button>
                        ))}
                    </div>
                    <ul className="newsList" id="newsList">
                        {filteredNews.map((news: any) => <NewsItem News={news} key={news.id} />)}
                    </ul>
                </div>
            </main>
            <PageFooter />
        </>
    );
}