import {AppDispatch, RootState} from "../redux/store";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../Slices/authSlice";
const PageLogin = () =>{

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const result = await dispatch(loginUser({ account, password }));
        if (loginUser.fulfilled.match(result)) {
            const userId = result.payload.userId; // Lấy userId từ kết quả API
            navigate(`/sharefile/${userId}`); // Chuyển hướng khi đăng nhập thành công
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-800 px-4">
            <div className="w-full max-w-md bg-indigo-500 rounded-lg backdrop-blur-3xl flex justify-center items-center p-6">
                <div className="flex flex-col w-full">
                    <div className="text-center text-indigo-800 font-bold text-4xl mb-6">Login</div>

                    <div className="mb-4">
                        <label className="text-xl block pb-2">Nhập Account</label>
                        <input
                            className="w-full max-w-xs sm:max-w-sm h-10 rounded-lg px-3"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-xl block pb-2">Nhập Password</label>
                        <input
                            type="password"
                            className="w-full max-w-xs sm:max-w-sm h-10 rounded-lg px-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="bg-blue-700 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-300
                                   font-medium rounded-full text-sm px-5 py-2.5 text-center"
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