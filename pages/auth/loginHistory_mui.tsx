import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

export default function LoginHistoryMui() {
  const [pageSize, setPageSize] = React.useState(8);
  var [rowsarr, setrowsarr] = useState([]);

  const fetchLoginHistoryInfo = async () => {
    try {
      const res = await axios.get('../api/user/login_history');
      const _input = res.data.result.map((rowData: any) => ({
        userno: rowData.userno,
        loginname: rowData.loginname,
        name: rowData.name,
        logindate: rowData.logindate,
        ipaddr: rowData.ipaddr,
        success: rowData.success,
      }));
      setrowsarr(_input);
    } catch (e) {
      console.log(e);
    }
  };

  var [rowsarr, setrowsarr] = useState([]);
  const rows = [];

  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'loginname', headerName: '아이디', width: 220 },
    { field: 'name', headerName: '성명', width: 220 },
    { field: 'logindate', headerName: '로그인 시간', width: 300 },
    { field: 'ipaddr', headerName: 'IP Address', sortable: false, width: 350 },
    { field: 'success', headerName: '결과', width: 85 },
  ];

  for (let i = 0; i < rowsarr.length; i++) {
    var _date = new Date(rowsarr[i].logindate);

    if (rowsarr[i].loginname !== 'admin') {
      rows.push({
        id: rows.length + 1,
        loginname: rowsarr[i].loginname,
        name: rowsarr[i].name,
        logindate:
          rowsarr[i].logindate.split('T')[0] +
          ' ' +
          String(_date.getHours()).padStart(2, '0') +
          ':' +
          String(_date.getMinutes()).padStart(2, '0') +
          ':' +
          String(_date.getSeconds()).padStart(2, '0'),
        ipaddr: rowsarr[i].ipaddr,
        success: rowsarr[i].success === 'y' ? '성공' : '실패',
      });
    }
  }

  useEffect(() => {
    fetchLoginHistoryInfo();
  }, []);

  return (
    <div style={{ height: 580, width: '100%' }}>
      <DataGrid
        sx={{
          border: 3,
          color: 'white',
        }}
        rows={rows.reverse()}
        columns={columns}
        checkboxSelection={false}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[8, 16, 24]}
      />
    </div>
  );
}
