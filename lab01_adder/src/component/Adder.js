import { useRef } from "react";
import { useState } from "react";

export default function Adder() {
    const [result, setResult] = useState(0);

    const aRef = useRef(0);
    const bRef = useRef(0);

    function addNum() {
        setResult(Number(aRef.current.value) + Number(bRef.current.value));
    }
    return (
        <div>
            <input type="number" id="a" ref={bRef} />
            <button onClick={addNum}>+</button>
            <input type="number" id="b" ref={aRef} />
            =
            <input type="text" id="result" disabled value={result} />
        </div>
    )
}