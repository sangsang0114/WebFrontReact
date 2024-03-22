import { Link } from "react-router-dom";
import dataJson from "../db/data.json";

export default function StudentList() {
    console.log(dataJson);
    return (
        <> <h1>학생 목록 페이지 입니다.</h1>
            <ul>
                {dataJson.students.map(student => (
                    <li key={student.id} >
                        <Link to={"/detail/" + student.id} state={{ stu: student }}>
                            {student.name} 전체 정보 보기  </Link>
                    </li>
                ))
                }
            </ul>
        </>
    );
}