/*
import { useState } from "react";
import styles from './product.module.css';
export default function Product(props) {
    const productlist = props.productlist;
    let tempPrices = [];
    let tempCondition = [];
    for (var i = 0; i < productlist.length; i++) {
        tempPrices.push(productlist[i].price);
        tempCondition.push(productlist[i].active == 'on' ? true : false);
    }
    let [prices, setPrice] = useState(tempPrices);
    let [condition, setCondition] = useState(tempCondition);

    const listView = [];
    for (var i = 0; i < productlist.length; i++) {
        listView.push(
            <tr id={productlist[i].id} className={condition[i] ? '' : styles.negative}>
                <td>{productlist[i].id}</td>
                <td>{productlist[i].productName}</td>
                <td>{prices[i]}</td>
                <td><img src={productlist[i].imageFileName} alt="이미지 준비중" /></td>
                <td>{condition[i] ? '판매중' : '판매중지'}</td>
                <td><input type="checkbox" checked={condition[i]} onChange={onChecked} className={i} /></td>
                <td><button onClick={updatePrice} className={i}>가격변경</button></td>
            </tr>
        )
    }

    function onChecked(event) {
        let idx = event.target.classList[0];
        let temp = [...condition];
        temp[idx] = !temp[idx];
        setCondition(temp);
        let id = parseInt(idx) + 1;
        document.getElementById(id).classList.toggle(styles.negative);
    }

    function updatePrice(event) {
        let idx = event.target.classList;
        let newPrice = prompt('변경할 가격을 입력하세요.', 0);
        let temp = [...prices]
        temp[idx] = newPrice;
        setPrice(temp);
    }

    return (
        <>
            {listView}
            <button>상품 추가하기 </button>
        </>
    )
}
*/

import { useState } from "react";
import styles from './Product.module.css';

export default function Product({ product }) {
    const [active, setActive] = useState(product.active);
    const [price, setPrice] = useState(product.price);

    function changeActive(event) {
        (event.target.checked === true) ? setActive("on") : setActive("off");
    }
    function changePrice() {
        setPrice(Number(prompt("변경할 가격을 입력하세요")))
    }
    return (
        <tr key={product.id} className={(active === "on") ? styles.onSale : styles.offSale}>
            <td>{product.id}</td>
            <td>{product.productName}</td>
            <td>{price}</td>
            <td><img className={styles.ProductImage} src={product.imageFileName} alt="상품이미지"></img></td>
            <td>{(active === "on") ? "판매중" : "판매중지"}</td>
            <td><input type="checkbox" onChange={changeActive} checked={(active === "on") ? true : false}></input></td>
            <td><button onClick={changePrice}>가격변경 </button></td>
        </tr>
    )
}

import Product from "./Product";

export default function ProductTable() {
    const productlist = [
        { id: 1, productName: "세정제", price: 100, imageFileName: "a1.png", active: "on" },
        { id: 2, productName: "상추", price: 200, imageFileName: "a2.png", active: "on" },
        { id: 3, productName: "빵", price: 300, imageFileName: "a3.png", active: "on" },
        { id: 4, productName: "콜라", price: 400, imageFileName: "a4.png", active: "off" }
    ]
    let products = [];
    productlist.forEach(p => {
        products.push(<Product product={p}  > </Product>)
        //products.push(  <Product id={p.id} name={p.productName} price={p.price} imageFileName={p.imageFileName} active={p.active}  > </Product>)
    })
    return (
        <table>
            {products}
        </table>
    )
}