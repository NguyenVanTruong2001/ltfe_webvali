export default function NewsItem({News}: {News: any}) {
    return (
        <>
            <li className="newsCard" data-topic="size">
                <p className="newsTopic">{News.topic}</p>
                <h2 className="newsTitle">{News.title}</h2>
                <p className="newsExcerpt">{News.excerpt}</p>
                <p className="newsMeta">{News.releasedDate} · {News.readTime} phút đọc</p>
            </li>
        </>
    )
}