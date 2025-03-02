import {AppDispatch, RootState} from "../redux/store";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../Slices/authSlice";
const PageLogin = () =>{

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const result = await dispatch(loginUser({ account, password }));
        if (loginUser.fulfilled.match(result)) {
            const userId = result.payload.userId; // Lấy userId từ kết quả API
            console.log("🔍 userId trước khi điều hướng:", userId);
            navigate(`/sharefile/${userId}`); // Chuyển hướng khi đăng nhập thành công
        }
    };
    console.log('dasdas', user)
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-800">
            <div className="h-auto w-1/4 bg-indigo-500 rounded-lg backdrop-blur-3xl flex justify-center items-center">
                <div className="flex-col p-3">
                    <div className="p-3 flex justify-center text-indigo-800 font-bold text-4xl">Login</div>
                    <div className="p-3">
                        <div className="text-xl pb-2">Nhập Account</div>
                        <input
                            className="w-96 h-10 rounded-lg px-3"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </div>
                    <div className="p-3">
                        <div className="text-xl pb-2">Nhập Password</div>
                        <input
                            type="password"
                            className="w-96 h-10 rounded-lg px-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="p-3 flex justify-center">
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="bg-blue-700 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLogin;