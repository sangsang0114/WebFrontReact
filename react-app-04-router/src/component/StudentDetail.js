import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom"

export default function StudentDetail() {
    // 파라미터 값 가져오기  
    // 1) 전체 파라미터 값
    const params = useParams()
    console.log(params);

    // 2) id 파라미터 값만 
    const id1 = useParams().id;
    const { id } = useParams();

    // 
    const location = useLocation();
    console.log(location)
    //state  값 가져오기 
    console.log(location.state.stu.id)
    console.log(location.state.stu.name)
    console.log(location.state.stu.grade)

    return (
        <> <h1> {id} 번 학생에 대한 정보 상세보기 페이지 입니다.</h1>
            <p>이름 {location.state.stu.name}</p>
            <p>     grade {location.state.stu.grade}    </p>
            <p>     maths점수 {location.state.stu.marks.maths}</p>
            <p>     chemistry점수 {location.state.stu.marks.chemistry}</p>
            <p>     physics점수 {location.state.stu.marks.physics}</p>
        </>
    )
}