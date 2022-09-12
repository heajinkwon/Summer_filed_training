import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

const AddBtn = styled.div`
  font-size: 12px;
  float: right;
`;

export default function AddUser() {
  var check = true;
  const [open, setOpen] = React.useState(false);
  const [adduser, setAddUser] = React.useState({
    loginname: '',
    lgpwd: '',
    check_lgpwd: '',
    name: '',
    company: '',
    phone: '',
    title: '',
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClose_addUser() {
    axios.get('../api/auth').then((res) => {
      for (
        let i = 0;
        i < res.data.result.length;
        i++ // db내 같은 loginname 우선 확인
      ) {
        if (res.data.result[i].loginname === adduser.loginname) {
          //alert('loginname 중복');
          check = false;
          break;
        }
      }
    });

    if (check && adduser.lgpwd === adduser.check_lgpwd) {
      var param = {
        adduser: adduser,
      };
      axios.post('../api/user/add_user', param).then((res) => {
        console.log('res add user : ', res);
      });
      alert('계정추가 완료');
    }
    setOpen(false);
  }

  return (
    <>
      <AddBtn>
        <Button variant="contained" onClick={handleClickOpen} style={{ marginTop: 15 }}>
          계정 추가
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>계정 추가</DialogTitle>
          <DialogContent>
            <DialogContentText>상세 정보를 입력해주세요</DialogContentText>
            <TextField
              margin="dense"
              label="ID"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setAddUser((preUser) => ({
                  ...preUser,
                  ['loginname']: e.target.value,
                }));
              }}
            />
            <TextField
              margin="dense"
              label="암호"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setAddUser((preUser) => ({
                  ...preUser,
                  ['lgpwd']: e.target.value,
                }));
              }}
            />
            <TextField
              margin="dense"
              label="암호 확인"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setAddUser((preUser) => ({
                  ...preUser,
                  ['check_lgpwd']: e.target.value,
                }));
              }}
            />
            <TextField
              margin="dense"
              label="이름"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setAddUser((preUser) => ({
                  ...preUser,
                  ['name']: e.target.value,
                }));
              }}
            />
            <TextField
              margin="dense"
              label="회사명"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setAddUser((preUser) => ({
                  ...preUser,
                  ['company']: e.target.value,
                }));
              }}
            />
            <TextField
              margin="dense"
              label="연락처"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setAddUser((preUser) => ({
                  ...preUser,
                  ['phone']: e.target.value,
                }));
              }}
            />
            <TextField
              margin="dense"
              label="직업"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setAddUser((preUser) => ({
                  ...preUser,
                  ['title']: e.target.value,
                }));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleClose_addUser}>확인</Button>
          </DialogActions>
        </Dialog>
      </AddBtn>
    </>
  );
}
