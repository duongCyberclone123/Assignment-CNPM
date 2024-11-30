import React from 'react';

import Navbar from '../../components/Navbar';
import Calendar from '../../components/Calendar';
import FileUpload from '../../components/Fileupload';
const Print = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/home', '/print', '/history', '/purchase'];


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
                <div style={{marginLeft: '20px'}}>
                    <Calendar scale={1.2} />
                </div>

                <div style={{ flex: 1, height: '157px'}}>
                    <FileUpload />
                </div>
            </div>
        </div>
    </>);
}

export default Print;