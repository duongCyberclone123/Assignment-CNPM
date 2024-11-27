import React from "react";
import FileUpload from "./components/FileUpload";
import FilePreview from "./components/FileRead";
function App() {
    return (
        <div>
            <FileUpload />
            <FilePreview />
        </div>
    );
}

export default App;
