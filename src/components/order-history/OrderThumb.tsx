import type {HistoryLine} from "../../lib/orders/history.ts";

interface OrderThumbProps {
    line: HistoryLine;
}

export default function OrderThumb({line}: OrderThumbProps) {
    return (
        <span className="summaryThumb">
            {line.image?.startsWith("#") ? (
                <svg className="summaryImage" viewBox="0 0 200 240" aria-hidden="true">
                    <use href={line.image} style={{["--bodyColor" as string]: line.colorHex}} />
                </svg>
            ) : (
                <img src={line.image} alt={line.name} className="summaryImage" />
            )}
        </span>
    );
}
