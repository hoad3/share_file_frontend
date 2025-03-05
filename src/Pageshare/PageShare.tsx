
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QR_URL = process.env.REACT_APP_QR_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL; // Thêm biến môi trường cho API upload
const FILES_URL = process.env.REACT_APP_UPLOAD_URL;
    const PageShare = () => {
        const [qrImage, setQrImage] = useState("");
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [uploadMessage, setUploadMessage] = useState<string | null>(null);
        const [fileList, setFileList] = useState<string[]>([]);
        const { userid } = useParams<{ userid: string }>(); // Lấy userid từ URL


        useEffect(() => {
            if (!userid) return;

            fetch(`${FILES_URL}/api/getfileuser?userId=${userid}`)
                .then((res) => res.json())
                .then((data) => setFileList(data)) // 🌟 Cập nhật danh sách file
                .catch((err) => console.error("Lỗi lấy danh sách file:", err));
        }, [userid]);

        useEffect(() => {
            if (!userid) return;

            fetch(`${QR_URL}/api/getlink?userId=${userid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.text())
                .then((data) => {
                    if (!data) return;
                    setQrImage(data.trim());
                })
                .catch((err) => console.error("Lỗi tải QR:", err));
        }, [userid]);

        if (!userid) {
            return <h2 className="text-white text-center">Lỗi: Không tìm thấy userid!</h2>;
        }


        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files.length > 0) {
                setSelectedFile(event.target.files[0]);
            }
        };


        const handleUpload = async () => {
            if (!selectedFile) {
                setUploadMessage("Vui lòng chọn một file trước!");
                return;
            }

            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("userId", userid!);

            try {
                const response = await fetch(`${UPLOAD_URL}/api/upfile`, {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();

                if (response.ok) {
                    setUploadMessage(`Tải file lên thành công!`);

                    // ✅ Gọi lại API lấy danh sách file sau khi upload thành công
                    fetch(`${FILES_URL}/api/getfileuser?userId=${userid}`)
                        .then((res) => res.json())
                        .then((data) => setFileList(data)) // Cập nhật danh sách file ngay
                        .catch((err) => console.error("Lỗi lấy danh sách file:", err));
                } else {
                    setUploadMessage(`Lỗi khi tải file: ${result.Message || "Không rõ nguyên nhân"}`);
                }
            } catch (error) {
                console.error("Lỗi tải file:", error);
                setUploadMessage("Lỗi khi kết nối đến server.");
            }
        };

        const downloadFile = async (url: string) => {
            try {
                const response = await fetch(url, { mode: "cors" }); // Thêm mode: "cors" để tránh lỗi chặn tải xuống
                if (!response.ok) throw new Error("Lỗi tải file");

                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);

                // Tạo thẻ <a> để tải file
                const link = document.createElement("a");
                link.href = blobUrl;
                link.setAttribute("download", url.split("/").pop() || "file_download"); // Đặt tên file tải xuống
                document.body.appendChild(link);
                link.click();

                // Xóa URL tạm sau khi tải xong
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
            } catch (error) {
                console.error("Lỗi tải file:", error);
                alert("Không thể tải file. Vui lòng thử lại!");
            }
        };
        return (
            <div className="w-full h-screen flex justify-center items-center bg-gray-800 px-4">
                <div className="w-full max-w-md h-auto flex flex-col border-gray-100 p-5 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-center items-center mb-4">
                        <img src={qrImage} alt="QR Code" className="w-64 h-64 sm:w-80 sm:h-80" />
                    </div>

                    {/* Upload File Section */}
                    <div className="flex flex-col items-center gap-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border p-2 rounded-lg w-full"
                        />
                        <button
                            onClick={handleUpload}
                            className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition"
                        >
                            Upload File
                        </button>
                        {uploadMessage && <p className="text-red-500 text-center">{uploadMessage}</p>}
                    </div>

                    {/* 🟢 Hiển thị danh sách file */}
                    <div className="mt-6 max-h-48 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-2 text-center">Danh sách file đã tải lên:</h3>
                        <ul className="space-y-2">
                            {fileList.length === 0 ? (
                                <p className="text-center">Không có file nào.</p>
                            ) : (
                                fileList.map((fileUrl, index) => (
                                    <li key={index} className="flex justify-between items-center p-2 border-b gap-2">
                                        <span className="text-blue-600 truncate w-2/3">{fileUrl.split("/").pop()}</span>
                                        <button
                                            onClick={() => downloadFile(fileUrl)}
                                            className="bg-green-500 text-white px-3 py-1 rounded-lg text-center hover:bg-green-600 transition"
                                        >
                                            Tải xuống
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    export default PageShare;
