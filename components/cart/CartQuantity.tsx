import {useEffect, useState} from "react";
import type {KeyboardEvent} from "react";
import {clampQuantity, MAX_QUANTITY, MIN_QUANTITY} from "../../lib/productDetail/options.ts";

interface CartQuantityProps {
    name: string
    quantity: number
    onChange: (quantity: number) => void
}

function Icon({id}: {id: string}) {
    return (
        <svg className="icon iconSm" aria-hidden="true">
            <use href={`#${id}`} />
        </svg>
    );
}

export default function CartQuantity({name, quantity, onChange}: CartQuantityProps) {
    const [draft, setDraft] = useState(String(quantity));

    useEffect(() => {
        setDraft(String(quantity));
    }, [quantity]);

    const commit = () => {
        const parsed = Number.parseInt(draft, 10);
        if (Number.isNaN(parsed)) {
            setDraft(String(quantity));
            return;
        }
        const next = clampQuantity(parsed);
        setDraft(String(next));
        if (next !== quantity) onChange(next);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            commit();
        }
    };

    return (
        <div className="cartQty">
            <button
                type="button"
                aria-label={`Giảm số lượng ${name}`}
                disabled={quantity <= MIN_QUANTITY}
                onClick={() => onChange(quantity - 1)}
            >
                <Icon id="iMinus" />
            </button>
            <input
                type="number"
                inputMode="numeric"
                min={MIN_QUANTITY}
                max={MAX_QUANTITY}
                value={draft}
                aria-label={`Số lượng ${name}`}
                onChange={(event) => setDraft(event.target.value)}
                onBlur={commit}
                onKeyDown={handleKeyDown}
            />
            <button
                type="button"
                aria-label={`Tăng số lượng ${name}`}
                disabled={quantity >= MAX_QUANTITY}
                onClick={() => onChange(quantity + 1)}
            >
                <Icon id="iPlus" />
            </button>
        </div>
    );
}
