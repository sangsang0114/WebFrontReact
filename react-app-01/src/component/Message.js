export default function Message() {
    function onClickHandle() {
        console.log("clicked");
        alert('clicked');
    }

    function onChangeName(event) {
        console.log(event.target.value);
    }

    let no = 3;
    function changeNum() {
        ++no;
        console.log(no);
        document.getElementById("no").innerText = no;
    }
    return (
        <div>
            Welcome! 서울
            <input type="text" onChange={onChangeName} />
            <button onClick={onClickHandle}>Click </button>
            <span id="no">{no}</span>
            <button onClick={changeNum}>ChangeNum</button>
        </div>
    )
}