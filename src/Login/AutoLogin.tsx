import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL
const AutoLogin = () => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userId = params.get("userid");
        const account = params.get("account");
        const password = params.get("password");

        if (userId && account && password) {
            fetch(
                `${LOGIN_URL}/api/auth/login-by-qr`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, account, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        navigate("/PageShare"); // Nếu đăng nhập thành công, chuyển hướng
                    } else {
                        navigate("/login"); // Nếu thất bại, quay về trang login
                    }
                });
        } else {
            navigate("/login");
        }
    }, [location, navigate]);

    return <h2>Đang xác thực đăng nhập...</h2>;
};

export default AutoLogin;
