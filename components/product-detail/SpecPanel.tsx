import type {Product} from "../../types/Product.ts";
import {specRows} from "../../lib/productDetail/specs.ts";
import {SIZE_GUIDE} from "../../lib/productDetail/sizeGuide.ts";

export default function SpecPanel({product}: {product: Product}) {
    const rows = specRows(product.specs);

    return (
        <div className="tabPanel panelSpec isActive">
            <table className="specTable">
                <caption className="visuallyHidden">Thông số kỹ thuật {product.name}</caption>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.key}>
                            <th scope="row">{row.label}</th>
                            <td>{row.value}</td>
                        </tr>
                    ))}
                    {product.colors.length > 0 && (
                        <tr>
                            <th scope="row">Màu sắc</th>
                            <td>{product.colors.map((color) => color.name).join(", ")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2 id="huongDanSize" className="panelTitle">Bảng size</h2>
            <div className="tableScroll">
                <table className="sizeTable">
                    <caption className="visuallyHidden">Kích thước và dung tích theo size</caption>
                    <thead>
                        <tr>
                            <th scope="col">Size</th>
                            <th scope="col">Kích thước (D × R × C)</th>
                            <th scope="col">Dung tích</th>
                            <th scope="col">Trọng lượng</th>
                            <th scope="col">Phù hợp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(SIZE_GUIDE).map(([size, guide]) => (
                            <tr key={size}>
                                <th scope="row">{guide.inch}</th>
                                <td>{guide.dimensions}</td>
                                <td>{guide.capacity}</td>
                                <td>{guide.weight}</td>
                                <td>{guide.suitable}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
