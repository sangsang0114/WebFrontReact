import Students from "./Students"
import styles from "./Hello.module.css"

export default function Hello() {
    const students = [
        { id: 1, name: "문동은" },
        { id: 2, name: "주여정" },
        { id: 3, name: "이사라" },
        { id: 4, name: "김연진" },
    ]
    return (
        <div>
            <h1 className={styles.title}> 안녕하세요? 환영합니다. </h1>
            <Students students={students} />
        </div>
    )
}