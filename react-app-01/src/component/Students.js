export default function Students(props) {
    const studentList = [];

    props.students.forEach(student => {
        studentList.push(<li key={student.id}>
            Welcome! {student.id}번  {student.name}    </li>);
    });

    return (
        <div>
            <ul>
                {studentList}
            </ul>
        </div>
    )
}