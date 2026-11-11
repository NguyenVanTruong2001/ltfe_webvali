import type {CSSProperties} from "react";
import type {ProductColor} from "../../types/Product.ts";
import {SIZE_GUIDE} from "../../lib/productDetail/sizeGuide.ts";

interface ProductOptionsProps {
    colors: ProductColor[]
    sizes: string[]
    color: string
    size: string
    onColorChange: (color: string) => void
    onSizeChange: (size: string) => void
}

export default function ProductOptions({colors, sizes, color, size, onColorChange, onSizeChange}: ProductOptionsProps) {
    const guide = SIZE_GUIDE[size];

    return (
        <>
            {colors.length > 0 && (
                <fieldset className="optionGroup">
                    <legend className="optionTitle">
                        Màu sắc: <span className="colorName isActive">{color}</span>
                    </legend>
                    <div className="colorRow">
                        {colors.map((item) => (
                            <label className={item.name === color ? "colorPick isActive" : "colorPick"} key={item.name}>
                                <input
                                    type="radio"
                                    name="color"
                                    value={item.name}
                                    className="visuallyHidden"
                                    checked={item.name === color}
                                    onChange={() => onColorChange(item.name)}
                                />
                                <span className="colorSwatch" style={{"--bodyColor": item.hex} as CSSProperties}></span>
                                <span className="visuallyHidden">{item.name}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )}
            {sizes.length > 0 && (
                <fieldset className="optionGroup sizeGroup">
                    <legend className="optionTitle">Size</legend>
                    <div className="sizeRow">
                        {sizes.map((item) => (
                            <label className={item === size ? "sizeChip isActive" : "sizeChip"} key={item}>
                                <input
                                    type="radio"
                                    name="size"
                                    value={item}
                                    className="visuallyHidden"
                                    checked={item === size}
                                    onChange={() => onSizeChange(item)}
                                />
                                {SIZE_GUIDE[item] ? `${item} - ${SIZE_GUIDE[item].inch}` : item}
                            </label>
                        ))}
                    </div>
                    {guide && (
                        <div className="sizeNotes">
                            <p className="sizeNote isActive">
                                {guide.dimensions}, {guide.capacity}, {guide.weight}. {guide.note}
                            </p>
                        </div>
                    )}
                </fieldset>
            )}
        </>
    );
}
