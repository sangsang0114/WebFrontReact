import Product from "./Product"
export default function ProductTable() {
    const productlist = [
        { id: 1, productName: "TV", price: 2000, imageFileName: "a1.png", active: "on" },
        { id: 2, productName: "Laptop", price: 800, imageFileName: "a2.png", active: "on" },
        { id: 3, productName: "Phone", price: 1200, imageFileName: "a3.png", active: "on" },
        { id: 4, productName: "Tablet", price: 1500, imageFileName: "a4.png", active: "off" }
    ]

    return (
        <div>
            <table border={1}>
                <Product productlist={productlist} />
            </table>
        </div >
    )
}