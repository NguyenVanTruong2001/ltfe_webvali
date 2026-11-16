import {WARRANTY_POLICY} from "../../lib/productDetail/content.ts";

export default function WarrantyPanel() {
    return (
        <div className="tabPanel panelWarranty isActive">
            <div className="prose">
                {WARRANTY_POLICY.map((section) => (
                    <div key={section.title}>
                        <h2 className="panelTitle">{section.title}</h2>
                        <p>{section.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
