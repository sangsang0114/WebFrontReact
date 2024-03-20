import { useState } from "react";

export default function Adder() {
    const [result, setResult] = useState(0);

    function addNum() {
        let a = parseInt(document.getElementById('a').value || 0);
        let b = parseInt(document.getElementById('b').value || 0);
        setResult(a + b)
    }
    return (
        <div>
            <input type="text" id="a" />
            <button onClick={addNum}>+</button>
            <input type="text" id="b" />
            =
            <input type="text" id="result" disabled value={result} />
        </div>
    )
}