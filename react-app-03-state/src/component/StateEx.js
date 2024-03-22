import { useState } from 'react';

export default function StateEx() {
    const [month, setMonth] = useState("June");
    function clickHandler1() {
        setMonth("April");
        alert(month); // June 출력
    }

    const [point, setPoint] = useState(0);
    function clickHandler2() {
        setPoint(point + 1);
        setPoint(point + 1);
        setPoint(point + 1);
        setPoint(point + 1);
    } // 1 2 3 ...

    function clickHandler3() {
        setPoint((prevState) => (prevState + 1));
        setPoint((prevState) => (prevState + 1));
        setPoint((prevState) => (prevState + 1));
        setPoint((prevState) => (prevState + 1));
    } // 4 8 12 ...

    const NewOne = {
        name: "김영수",
        age: 30
    };
    const [user, setUser] = useState(NewOne);
    function clickHandler4_1() {
        NewOne.age = 31;
        setUser(NewOne);
    } // not working

    function clickHandler4_2() {
        setUser(prevState => {
            NewOne.age = 31;
            console.log(prevState === NewOne);
            return NewOne;
        });
    } // false


    function clickHandler4_3() {
        setUser(prevState => {
            NewOne.age = 31;
            const NewNewOne = { ...NewOne, age: 31 } // 새 객체 
            console.log(prevState === NewNewOne);   // false
            return NewNewOne;
        });
    }

    return (
        <div>
            {month} <button onClick={clickHandler1}>month 변경</button>
            {point} <button onClick={clickHandler2}>point 변경</button>
            {point} <button onClick={clickHandler3}>point 변경</button>
            {user.name} <button onClick={clickHandler4_3}>age 변경</button>
        </div>
    )
}