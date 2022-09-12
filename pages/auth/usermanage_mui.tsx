import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import 'semantic-ui-css/semantic.min.css';
import { useState } from 'react';
import axios from 'axios';
import ModifyUser from './modifyUser';
import AddUser from './addUser';
import DeleteUser from './deleteUser';
import crypto from 'crypto-js';
import { setCookie } from 'cookies-next';

var columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 70 },
  { field: 'loginname', headerName: '아이디', width: 220 },
  { field: 'name', headerName: '성명', width: 220 },
  { field: 'company', headerName: '소속', width: 300 },
  { field: 'phone', headerName: '연락처', sortable: false, width: 330 },
  { field: 'title', headerName: '직업', width: 100 },
];

export default function UserManageMui() {
  const [pageSize, setPageSize] = React.useState(8);

  var [rowsarr, setrowsarr] = useState([]);
  var rows = [];

  var [selectdata, setSelectData] = useState({
    id: Number,
    loginname: '',
    lgpwd: '',
    name: '',
    company: '',
    phone: '',
    title: '',
  });

  axios.get('../api/auth').then((res) => {
    try {
      const _input = res.data.result.map((rowData: any) => ({
        userno: rowData.userno,
        loginname: rowData.loginname,
        name: rowData.name,
        company: rowData.company,
        phone: rowData.phone,
        title: rowData.title,
      }));

      //console.log('usermange_mui 의 api auth : ', res.data.result);
      if (res.data.result.length === 0 || (res.data.result.length === 1 && res.data.result[0].loginname === 'admin')) {
        console.log('usermanage : ', res.data.result);
        setCookie('loginname', 'admin');
        setCookie('title', '현장 PM');
      }

      for (let i = 1; i < _input.length; i++) {
        _input[i].phone = crypto.AES.decrypt(_input[i].phone, 'phone_encrypt').toString(crypto.enc.Utf8);
      }
      setrowsarr(_input);
    } catch (error) {
      console.log(error);
    }
  });

  for (let i = 0; i < rowsarr.length; i++) {
    rows.push({
      id: Number(i),
      loginname: rowsarr[i].loginname,
      name: rowsarr[i].name,
      company: rowsarr[i].company,
      phone: rowsarr[i].phone,
      title: rowsarr[i].title,
    });
  }

  if (rows[0] && rows[0].loginname === 'admin') {
    rows.shift();
  }

  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        sx={{
          border: 3,
          color: 'white',
        }}
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[8, 16, 24]}
        onSelectionModelChange={(selection) => {
          const selectedRowData = rows[Number(selection) - 1];
          setSelectData(selectedRowData);
        }}
      />
      <div>
        <AddUser />
        <DeleteUser selectdata={selectdata} />
        <ModifyUser selectdata={selectdata} />
      </div>
    </div>
  );
}
