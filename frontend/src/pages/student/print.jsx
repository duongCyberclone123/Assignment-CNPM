import React from 'react';
import { Button } from "@mui/material";

import Navbar from '../../components/Navbar';
import Calendar from '../../components/Calendar';
import FileUpload from '../../components/Fileupload';
import PrinterList from '../../components/Printerlist';
import { param } from '../../../../backend/src/routes/printingProcess';

const Print = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/home', '/print', '/history', '/purchase'];

    let pageSize = "A4";
    let isDoubleside = true, isColor = true, isHorizon = true;
    let numberOfCopies = 1;
    let numOfPages = 0;
    let dID = -1;
    let docSize = 0;
    let docName = "";
    const studenID = localStorage.getItem("ID");
    const handleFileConfigure = (id, value) => {
        switch (id) {
            case 1:
                pageSize = value;
                break;
            case 2:
                numOfPages = value;
                break
            case 3:
                isDoubleside = (value == "two") ? true : false;
                break
            case 4:
                isColor = (value == "Color") ? true : false;
                break
            case 5:
                isHorizon = (value == "Horizontal") ? true : false;
                break
            case 6:
                numberOfCopies = value;
                break
            case 100:
                pageSize = "A4";
                isDoubleside = true; isColor = true; isHorizon = true;
                numberOfCopies = 1;
                break;
            case 10:
                docSize = value;
                break
            case 11:
                docName = value;
                break
        }
        console.log({ pageSize, isDoubleside, isColor, isHorizon, numberOfCopies, numOfPages });
    }
    let PID = -1;
    const handlePrinterConfigure = (value) => {
        PID = value;
    }

    const uploadFile = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/printing/uploadFile", {
                params: { uid: localStorage.getItem("ID") },
                body: {
                    dname: docName,
                    dsize: docSize,
                    dformat: "PDF",
                    dpage_num: numOfPages
                }
            });
            dID = response.did;
        } catch (error) {
            console.error("Error while upload document", error.message);
        }
    };

    const makeTransition = async () => {
        try {
            const responseMakeTran = await axios.get("http://localhost:8000/api/printing/receivePrintingRequest", {
                body: {
                    isdoublesize: isDoubleside,
                    ishorzon: isHorizon,
                    iscoloring: isColor,
                    tpagesize: pageSize,
                    tpages_per_copy: numOfPages,
                    tcopies: numberOfCopies,
                    pid: PID,
                    did: '1',
                    sid: studenID,
                }
            });
            const responseUpTran = await axios.get("http://localhost:8000/api/printing/Printing", {
                params: { pID: PID }
            });
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
                            sx={{ height: "100%" }}
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