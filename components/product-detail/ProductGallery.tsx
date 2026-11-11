interface ProductGalleryProps {
    images: string[]
    name: string
    discountPercent: number
    activeIndex: number
}

export default function ProductGallery({images, name, discountPercent, activeIndex}: ProductGalleryProps) {
    return (
        <div className="gallery">
            <div className="galleryMain">
                {discountPercent > 0 && <span className="badgeSale">-{discountPercent}%</span>}
                {images.map((src, index) => (
                    <figure className={index === activeIndex ? "galleryItem isActive" : "galleryItem"} key={src}>
                        <img className="galleryPhoto" src={src} alt={`${name} - ảnh ${index + 1}`} />
                    </figure>
                ))}
            </div>
            <div className="thumbs">
                {images.map((src, index) => (
                    <span className={index === activeIndex ? "thumb isActive" : "thumb"} key={src}>
                        <img className="thumbPhoto" src={src} alt="" />
                    </span>
                ))}
            </div>
        </div>
    );
}
