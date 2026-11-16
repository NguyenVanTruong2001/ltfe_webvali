import { useEffect, useMemo, useState, type CSSProperties, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import ProductItem from "../Product-Item.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
    clearCart,
    removeFromCart,
    selectCartCount,
    selectCartLines,
    setLineQuantity,
} from "../../store/cartSlice.ts";
import { loadProducts, selectProducts } from "../../store/productsSlice.ts";
import { selectWishIds, toggleWish } from "../../store/wishlistSlice.ts";
import { MAX_QUANTITY, MIN_QUANTITY } from "../../lib/productDetail/options.ts";
import "../../ui/css/cart.css";

const FREE_SHIP_THRESHOLD = 1000000;
const SHIPPING_FEE = 30000;

interface PromoCode {
    code: string;
    label: string;
    discount: (subtotal: number) => number;
}

const PROMO_CODES: Record<string, PromoCode> = {
    WELCOME10: {
        code: "WELCOME10",
        label: "WELCOME10, 10%",
        discount: (subtotal) => Math.round(subtotal * 0.1),
    },
    VALIGO50: {
        code: "VALIGO50",
        label: "VALIGO50, 50.000₫",
        discount: () => 50000,
    },
};

function formatPrice(value: number): string {
    return `${value.toLocaleString("vi-VN")}₫`;
}

function shapeSymbol(category: string): string {
    if (category === "backpack") return "#backpack";
    if (category === "accessory") return "#pouch";
    return "#suitcase";
}

export default function CartPage() {
    const dispatch = useAppDispatch();
    const lines = useAppSelector(selectCartLines);
    const totalCount = useAppSelector(selectCartCount);
    const products = useAppSelector(selectProducts);
    const wishIds = useAppSelector(selectWishIds);

    const [promoInput, setPromoInput] = useState("");
    const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
    const [promoError, setPromoError] = useState("");

    useEffect(() => {
        if (products.length === 0) {
            dispatch(loadProducts());
        }
    }, [dispatch, products.length]);

    const cartItems = useMemo(() => {
        return lines
            .map((line) => {
                const product = products.find((p) => p.id === line.productId);
                if (!product) return null;
                const matchedColor = product.colors.find((c) => c.name === line.color);
                return {
                    line,
                    product,
                    colorHex: matchedColor?.hex ?? product.colors[0]?.hex ?? "#12263A",
                    lineTotal: product.price * line.quantity,
                    originalLineTotal: product.originalPrice * line.quantity,
                };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);
    }, [lines, products]);

    const subtotal = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
        [cartItems],
    );

    const totalSaved = useMemo(
        () =>
            cartItems.reduce(
                (sum, item) =>
                    sum + Math.max(0, item.originalLineTotal - item.lineTotal),
                0,
            ),
        [cartItems],
    );

    const discountAmount = useMemo(() => {
        if (!appliedPromo || subtotal === 0) return 0;
        return Math.min(subtotal, appliedPromo.discount(subtotal));
    }, [appliedPromo, subtotal]);

    const isFreeShip = subtotal >= FREE_SHIP_THRESHOLD;
    const shippingFee = subtotal === 0 || isFreeShip ? 0 : SHIPPING_FEE;
    const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
    const shipProgress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));

    const recommendedProducts = useMemo(() => {
        const inCartIds = new Set(lines.map((l) => l.productId));
        return products.filter((p) => !inCartIds.has(p.id)).slice(0, 4);
    }, [products, lines]);

    const handleApplyPromo = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const code = promoInput.trim().toUpperCase();
        if (!code) {
            setPromoError("Vui lòng nhập mã giảm giá.");
            return;
        }
        const found = PROMO_CODES[code];
        if (!found) {
            setPromoError("Mã giảm giá không hợp lệ (thử WELCOME10 hoặc VALIGO50).");
            return;
        }
        setAppliedPromo(found);
        setPromoError("");
        setPromoInput("");
    };

    const handleMoveToWish = (productId: number, key: string) => {
        if (!wishIds.includes(productId)) {
            dispatch(toggleWish(productId));
        }
        dispatch(removeFromCart(key));
    };

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
                            <li aria-current="page">Giỏ hàng</li>
                        </ol>
                    </nav>

                    <div className="cartHead">
                        <div>
                            <h1 className="cartTitle">Giỏ hàng</h1>
                            <p className="cartCount">{totalCount} sản phẩm trong giỏ</p>
                        </div>
                        <Link to="/products" className="textLink">Tiếp tục mua sắm</Link>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="emptyState" style={{ padding: "48px 0", textAlign: "center" }}>
                            <p className="emptyTitle">Giỏ hàng của bạn đang trống</p>
                            <p style={{ marginBottom: "16px" }}>
                                Khám phá các mẫu vali, balo và phụ kiện du lịch mới nhất tại Valigo.
                            </p>
                            <Link to="/products" className="btn btnPrimary">
                                Khám phá sản phẩm
                            </Link>
                        </div>
                    ) : (
                        <div className="cartLayout">
                            <section aria-label="Sản phẩm trong giỏ">
                                <div className="shipMeter">
                                    <p>
                                        <svg className="icon iconSm" aria-hidden="true">
                                            <use href="#iTruck" />
                                        </svg>
                                        {isFreeShip ? (
                                            <strong>Đơn hàng của bạn được miễn phí vận chuyển.</strong>
                                        ) : (
                                            <span>
                                                Mua thêm{" "}
                                                <strong>{formatPrice(FREE_SHIP_THRESHOLD - subtotal)}</strong>{" "}
                                                để được <strong>miễn phí vận chuyển</strong>.
                                            </span>
                                        )}
                                    </p>
                                    <div
                                        className="meterBar"
                                        role="progressbar"
                                        aria-label="Tiến độ miễn phí vận chuyển"
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-valuenow={shipProgress}
                                    >
                                        <span
                                            className="meterFill"
                                            style={{ "--meterWidth": `${shipProgress}%` } as CSSProperties}
                                        />
                                    </div>
                                </div>

                                <div className="cartCols" aria-hidden="true">
                                    <span />
                                    <span>Sản phẩm</span>
                                    <span>Số lượng</span>
                                    <span className="colEnd">Thành tiền</span>
                                </div>

                                <ul className="cartList">
                                    {cartItems.map(({ line, product, colorHex, lineTotal }) => {
                                        const detailUrl = `/products/${product.id}/${product.slug}`;
                                        const variantParts = [
                                            line.color ? `Màu: ${line.color}` : "",
                                            line.size ? `Size: ${line.size}` : "",
                                        ].filter(Boolean);

                                        return (
                                            <li className="cartItem" key={line.key}>
                                                <Link
                                                    to={detailUrl}
                                                    className="cartThumb"
                                                    aria-label={`Xem ${product.name}`}
                                                >
                                                    <svg className="cartImage" viewBox="0 0 200 240" aria-hidden="true">
                                                        <use
                                                            href={shapeSymbol(product.category)}
                                                            style={{ "--bodyColor": colorHex } as CSSProperties}
                                                        />
                                                    </svg>
                                                </Link>

                                                <div className="cartInfo">
                                                    <h3 className="cartName">
                                                        <Link to={detailUrl}>{product.name}</Link>
                                                    </h3>
                                                    {variantParts.length > 0 && (
                                                        <p className="cartVariant">{variantParts.join(", ")}</p>
                                                    )}
                                                    <p className="cartUnitPrice">
                                                        <strong>{formatPrice(product.price)}</strong>
                                                        {product.originalPrice > product.price && (
                                                            <s>{formatPrice(product.originalPrice)}</s>
                                                        )}
                                                    </p>
                                                    <div className="cartActions">
                                                        <button
                                                            type="button"
                                                            className="textAction"
                                                            onClick={() => handleMoveToWish(product.id, line.key)}
                                                        >
                                                            Chuyển vào yêu thích
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="textAction"
                                                            onClick={() => dispatch(removeFromCart(line.key))}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="cartQtyCell">
                                                    <div className="cartQty">
                                                        <button
                                                            type="button"
                                                            disabled={line.quantity <= MIN_QUANTITY}
                                                            aria-label={`Giảm số lượng ${product.name}`}
                                                            onClick={() =>
                                                                dispatch(
                                                                    setLineQuantity({
                                                                        key: line.key,
                                                                        quantity: line.quantity - 1,
                                                                    }),
                                                                )
                                                            }
                                                        >
                                                            <svg className="icon iconSm" aria-hidden="true">
                                                                <use href="#iMinus" />
                                                            </svg>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={line.quantity}
                                                            min={MIN_QUANTITY}
                                                            max={MAX_QUANTITY}
                                                            aria-label={`Số lượng ${product.name}`}
                                                            onChange={(e) => {
                                                                const val = Number(e.target.value);
                                                                if (Number.isFinite(val)) {
                                                                    dispatch(
                                                                        setLineQuantity({
                                                                            key: line.key,
                                                                            quantity: val,
                                                                        }),
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            disabled={line.quantity >= MAX_QUANTITY}
                                                            aria-label={`Tăng số lượng ${product.name}`}
                                                            onClick={() =>
                                                                dispatch(
                                                                    setLineQuantity({
                                                                        key: line.key,
                                                                        quantity: line.quantity + 1,
                                                                    }),
                                                                )
                                                            }
                                                        >
                                                            <svg className="icon iconSm" aria-hidden="true">
                                                                <use href="#iPlus" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <p className="cartLineTotal">{formatPrice(lineTotal)}</p>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="cartBottom">
                                    <button
                                        type="button"
                                        className="textAction"
                                        onClick={() => dispatch(clearCart())}
                                    >
                                        Xóa tất cả sản phẩm
                                    </button>
                                    {totalSaved > 0 && (
                                        <p className="savedNote">
                                            Bạn tiết kiệm {formatPrice(totalSaved)} so với giá gốc
                                        </p>
                                    )}
                                </div>
                            </section>

                            <aside className="summary" aria-labelledby="summaryTitle">
                                <h2 id="summaryTitle" className="summaryTitle">Tóm tắt đơn hàng</h2>
                                <form className="promoForm" onSubmit={handleApplyPromo}>
                                    <label className="visuallyHidden" htmlFor="promoCode">Mã giảm giá</label>
                                    <input
                                        id="promoCode"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Nhập mã (WELCOME10)"
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value)}
                                    />
                                    <button type="submit" className="btn btnGhost">Áp dụng</button>
                                </form>

                                {promoError && (
                                    <p style={{ color: "#d93025", fontSize: "0.85rem", marginTop: "6px" }}>
                                        {promoError}
                                    </p>
                                )}

                                {appliedPromo && (
                                    <p className="promoApplied">
                                        <span>
                                            <svg className="icon iconSm" aria-hidden="true">
                                                <use href="#iCheck" />
                                            </svg>
                                            Mã {appliedPromo.code} đã được áp dụng
                                        </span>
                                        <button
                                            type="button"
                                            className="textAction"
                                            aria-label={`Bỏ mã ${appliedPromo.code}`}
                                            onClick={() => setAppliedPromo(null)}
                                        >
                                            Bỏ mã
                                        </button>
                                    </p>
                                )}

                                <dl className="summaryRows">
                                    <div className="summaryRow">
                                        <dt>Tạm tính</dt>
                                        <dd>{formatPrice(subtotal)}</dd>
                                    </div>
                                    {appliedPromo && (
                                        <div className="summaryRow isDiscount">
                                            <dt>Giảm giá ({appliedPromo.label})</dt>
                                            <dd>-{formatPrice(discountAmount)}</dd>
                                        </div>
                                    )}
                                    <div className="summaryRow">
                                        <dt>Phí vận chuyển</dt>
                                        <dd>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</dd>
                                    </div>
                                </dl>

                                <p className="summaryTotal">
                                    <span>Tổng cộng</span>
                                    <strong>{formatPrice(grandTotal)}</strong>
                                </p>
                                <p className="summaryNote">Đã bao gồm thuế VAT</p>

                                <Link to="/checkout" className="btn btnPrimary btnBlock">
                                    Tiến hành thanh toán
                                </Link>

                                <ul className="methodList" aria-label="Phương thức thanh toán">
                                    <li className="methodChip">COD</li>
                                    <li className="methodChip">Thẻ ATM</li>
                                    <li className="methodChip">Visa / Mastercard</li>
                                    <li className="methodChip">Ví điện tử</li>
                                </ul>

                                <ul className="summaryPerks">
                                    <li>
                                        <svg className="icon iconSm" aria-hidden="true">
                                            <use href="#iRefresh" />
                                        </svg>
                                        Đổi trả trong 7 ngày nếu lỗi nhà sản xuất
                                    </li>
                                    <li>
                                        <svg className="icon iconSm" aria-hidden="true">
                                            <use href="#iShield" />
                                        </svg>
                                        Bảo hành toàn quốc 24 tháng
                                    </li>
                                    <li>
                                        <svg className="icon iconSm" aria-hidden="true">
                                            <use href="#iPackage" />
                                        </svg>
                                        Đóng gói cẩn thận, giao trong 2 đến 4 ngày
                                    </li>
                                </ul>
                            </aside>
                        </div>
                    )}

                    {recommendedProducts.length > 0 && (
                        <section className="alsoLike" aria-labelledby="alsoTitle">
                            <div className="sectionHead">
                                <h2 id="alsoTitle" className="sectionTitle">Có thể bạn cũng thích</h2>
                                <Link to="/products" className="textLink">Xem tất cả vali</Link>
                            </div>
                            <div className="grid">
                                {recommendedProducts.map((product) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        wished={wishIds.includes(product.id)}
                                        onToggleWish={(id) => dispatch(toggleWish(id))}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <PageFooter />
        </>
    );
}