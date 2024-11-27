import React, { useState } from "react";
import axios from "axios";
const FilePreview = () => {
    const [fileURL, setFileURL] = useState(null);
    const [fileType, setFileType] = useState(null);

    const fetchFileContent = async (fileId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/printing/files?did=${fileId}`, {
                responseType: "blob", // Để xử lý dữ liệu file
            });

            const mimeType = response.data.type; // Lấy loại file (MIME type)
            const fileURL = URL.createObjectURL(response.data); // Tạo URL để xem file
            setFileType(mimeType); // Lưu loại file
            setFileURL(fileURL); // Lưu URL để hiển thị
        } catch (error) {
            console.error("Error fetching file:", error);
        }
    };

    return (
        <div>
            <h2>Fetch and Preview File</h2>
            <button onClick={() => fetchFileContent("7d57f17a-6266-43eb-9fae-e3fd7de36dcd")}>Fetch File</button>

            {fileType && fileURL && (
                <div style={{ marginTop: "20px" }}>
                    {fileType.startsWith("image/") && <img src={fileURL} alt="Preview" />}
                    {fileType.startsWith("application/pdf") && (
                        <embed src={fileURL} type={fileType} width="100%" height="500px" />
                    )}
                    {fileType.startsWith("text/") && (
                        <iframe src={fileURL} title="Text Preview" width="100%" height="500px" />
                    )}
                    {!fileType.startsWith("image/") &&
                        !fileType.startsWith("application/pdf") &&
                        !fileType.startsWith("text/") && <p>File type not supported for preview.</p>}
                </div>
            )}
        </div>
    );
};

export default FilePreview;
