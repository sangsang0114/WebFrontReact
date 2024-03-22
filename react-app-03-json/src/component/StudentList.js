import dataJson from "../db/data.json";
// 자바스크립트 객체 배열로 자동 생성

export default function StudentList() {
    console.log(dataJson);

    return (
        <ul>
            {dataJson.students.map(student => (
                <li key={student.id}>
                    {student.name}
                </li>
            ))
            }
        </ul>
    );
}