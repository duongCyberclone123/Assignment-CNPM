import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState(null); // Lưu file người dùng chọn
    const [message, setMessage] = useState(""); // Thông báo trạng thái

    // Xử lý khi người dùng chọn file
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Lưu file vào state
    };

    // Xử lý upload file
    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // The actual file object
        formData.append("dname", file.name); // File name
        formData.append("dsize", `${(file.size / 1024).toFixed(2)} KB`); // Convert size to KB and format it
        formData.append("dformat", file.name.split('.').pop()); // Extract file extension
        formData.append("dpage_num", 0); // Default page number if unknown
        const date = new Date();
        const mysqlDatetime = date.toISOString().slice(0, 19).replace('T', ' ');
        formData.append("dupload_time", mysqlDatetime);
        try {
            const response = await axios.post("http://localhost:8000/api/printing/uploadFile?uid=2001", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage(response.data.message); // Hiển thị thông báo từ server
        } catch (error) {
            setMessage("Upload failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Upload
            </button>
            {message && <p style={{ marginTop: "10px", color: "blue" }}>{message}</p>}
        </div>
    );
};

export default FileUpload;
