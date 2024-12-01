import React, { useState } from 'react';
import { Button } from "@mui/material";

import Navbar from '../../components/Navbar';
import Calendar from '../../components/Calendar';
import FileUpload from '../../components/Fileupload';
import PrinterList from '../../components/Printerlist';
import axios from 'axios';

const Print = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/home', '/print', '/history', '/purchase'];
    const [seFile, setSeFile] = useState(false);
    const [seFilePage, setSeFilePage] = useState(false);
    const [sePrinter, setSePrinter] = useState(false);

    const [pID, setPID] = useState(-1);
    const [pageSize, setPageSize] = useState("A4");
    const [isDoubleside, setIsDoubleside] = useState(true);
    const [isColor, setIsColor] = useState(true);
    const [isHorizon, setIsHorizon] = useState(true);
    const [numberOfCopies, setNumberOfCopies] = useState(1);
    const [numOfPages, setNumOfPages] = useState(0);
    const [dID, setDID] = useState(-1);
    const [docSize, setDocSize] = useState(0);
    const [docName, setDocName] = useState("");
    const studentID = localStorage.getItem("ID");
    const handleFileConfigure = (id, value) => {
        switch (id) {
            case 1:
                setPageSize(value);
                break;
            case 2:
                setNumOfPages(value);
                break
            case 3:
                setIsDoubleside((value == "two") ? true : false);
                break
            case 4:
                setIsColor((value == "Color") ? true : false);
                break
            case 5:
                setIsHorizon((value == "Horizontal") ? true : false);
                break
            case 6:
                setNumberOfCopies(value);
                break
            case 100:
                setPageSize("A4");
                setIsDoubleside(true);
                setIsColor(true);
                setIsHorizon(true);
                setNumberOfCopies(1);
                break;
            case 10:
                setDocSize(value + 1);
                break
            case 11:
                setDocName(value);
                break
            case 20:
                setSeFile(true);
                break
            case 21:
                setSeFilePage(true);
                break
        }
        console.log({ pageSize, isDoubleside, isColor, isHorizon, numberOfCopies, numOfPages, dID, docName, docSize, studentID, pID });
    }
    const handlePrinterConfigure = (id, value) => {
        switch (id) {
            case 1:
                setPID(value);
                break;
            case 2:
                setSePrinter(true);
                break;
        }


    }

    const uploadFile = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/printing/uploadFile", {
                dname: docName,
                dsize: docSize,
                dformat: "PDF",
                dpage_num: numOfPages
            },
                { params: { uid: studentID }, }
            );
            setDID(parseInt(response.data.data.did));
        } catch (error) {
            console.error("Error while upload document", error.message);
        }
    };

    const makeTransition = async () => {
        try {
            const responseMakeTran = await axios.post("http://localhost:8000/api/printing/receivePrintingRequest",
                {
                    isdoublesize: isDoubleside ? 1 : 0,
                    ishorizon: isHorizon ? 1 : 0,
                    iscoloring: isColor ? 1 : 0,
                    tpagesize: pageSize,
                    tpages_per_copy: numOfPages,
                    tcopies: numberOfCopies,
                    pid: pID,
                    did: dID,
                    sid: parseInt( studentID),
                }
            );
        } catch (error) {
            console.error("Error while upload document", error.message);
        }
    }

    return (<>
        <style>
            {`html, body {margin: 0; padding: 0; width: 100%; overflow-x: hidden;}`}
        </style>

        <Navbar
            title="STUDENT PORTAL"
            menuItems={menuItems}
            routes={routes}
            active={"In tài liệu"}
        />

        <div style={{
            padding: '90px 15px',
            maxWidth: '1500px',
            display: 'flex',       // Flexbox for alignment
            justifyContent: 'center', // Horizontal alignment with space between items
            margin: '0 auto',      // Center the Box horizontally in the viewport
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                <div style={{ flex: 1, height: '157px', display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
                    <FileUpload onChangeValue={handleFileConfigure} />
                    <PrinterList onChangeValue={handlePrinterConfigure} />
                    <div style={{
                        padding: "20px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <Button

                            variant="contained"
                            component="span"
                            sx={{
                                height: "100%",
                            }}
                            disabled={!(seFile && sePrinter && seFilePage)}
                            onClick={async () => {
                                await uploadFile();
                                makeTransition();
                            }}
                        >
                            PRINT
                        </Button>
                        
                    </div>
                </div>
                <div style={{ marginLeft: '20px', width: "50%", display: 'flex', justifyContent: 'center' }}>
                    <Calendar scale={1.2} />
                </div>
            </div>

        </div>
    </>);
}

export default Print;