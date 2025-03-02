import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const QR_URL=process.env.REACT_APP_QR_URL
const  PageShare = () =>{
    const [qrImage, setQrImage] = useState("");
    const { userid } = useParams<{ userid: string }>(); // Lấy userid từ URL
    useEffect(() => {
        if (!userid) return;

        fetch(`https://localhost:44364/api/getlink?userId=${userid}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.text()) // Nhận dữ liệu dạng text
            .then((data) => {
                if (!data) return;
                setQrImage(data.trim()); // Lưu URL vào state
            })
            .catch((err) => console.error("Lỗi tải QR:", err));
    }, [userid]);
    if (!userid) {
        return <h2>Lỗi: Không tìm thấy userid!</h2>;
    }


    return(
        <div className='w-full h-screen flex justify-center items-center bg-gray-800'>
            <div className='w-2/4 h-auto flex-col border-gray-100'>
                <div className='flex justify-center items-center'>
                    <img src={qrImage} alt="QR Code" className='w-80 h-80' />
                </div>
                <div className='flex justify-center items-center'>
                    Tải file lên ở đây.
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default PageShare;