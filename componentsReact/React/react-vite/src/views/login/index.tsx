import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    const handleLogin = async values => {
        console.log("🚀 ~ handleLogin ~ values:", values);
        try {
            navigate("/home", {replace: true});
        } catch (_error) {}
    };
    return <div onClick={handleLogin}>login</div>;
}
