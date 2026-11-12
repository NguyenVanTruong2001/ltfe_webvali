import type {CSSProperties} from "react";

export default function StarRating({rating, label}: {rating: number, label: string}) {
    return (
        <span className="stars">
            <span className="starsTrack" role="img" aria-label={label}>
                ★★★★★
                <span className="starsFill" style={{"--rateWidth": `${rating * 20}%`} as CSSProperties} aria-hidden="true">
                    ★★★★★
                </span>
            </span>
        </span>
    );
}
