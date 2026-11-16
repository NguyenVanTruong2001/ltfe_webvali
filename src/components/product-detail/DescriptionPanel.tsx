import type {Product} from "../../types/Product.ts";

const FEATURES = [
    {icon: "iShield", title: "Chất liệu", spec: "material"},
    {icon: "iPackage", title: "Dung tích", spec: "capacity"},
    {icon: "iRefresh", title: "Bánh xe", spec: "wheels"},
    {icon: "iHeadset", title: "Khóa", spec: "lock"},
] as const;

export default function DescriptionPanel({product}: {product: Product}) {
    const features = FEATURES.filter((feature) => product.specs[feature.spec]);

    return (
        <div className="tabPanel panelDesc isActive">
            <div className="prose">
                <p>{product.description}</p>
            </div>
            {features.length > 0 && (
                <ul className="featureGrid">
                    {features.map((feature) => (
                        <li className="feature" key={feature.spec}>
                            <svg className="icon iconLg" aria-hidden="true">
                                <use href={`#${feature.icon}`} />
                            </svg>
                            <span>
                                <strong>{feature.title}</strong>
                                <span className="featureText">{product.specs[feature.spec]}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
