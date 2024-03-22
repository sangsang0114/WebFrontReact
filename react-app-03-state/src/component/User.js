import { useState } from "react";

export default function User() {
    const [user, setUser] = useState({ "id": 1, name: "kim" });

    function test() {
        user.name = "lee";
        setUser(user);

        //let newUser = {...user, name: "lee"};
        //setUser(newUser);
    }
    return (
        <button onClick={test}> {user.name}</button>
    )
}