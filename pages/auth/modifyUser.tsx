import React, { useEffect } from 'react';
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

const Modify = styled.div`
  font-size: 12px;
  float: right;
`;

export default function ModifyUser(props) {
  const [open, setOpen] = React.useState(false);
  const [userinfo, setUserinfo] = React.useState({
    loginname: '',
    name: '',
    lgpwd: '',
    check_lgpwd: '',
    company: '',
    phone: '',
    title: '',
  });

  function handleClickOpen() {
    if (props.selectdata) {
      setUserinfo((prevState) => {
        return {
          ...prevState,
          loginname: props.selectdata.loginname,
          name: props.selectdata.name,
          company: props.selectdata.company,
          phone: props.selectdata.phone,
          title: props.selectdata.title,
        };
      });
    }
    //console.log("modify user : ",props.selectdata);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClose_modifyUser() {
    var param = {
      modifyuser: userinfo,
    };

    if (userinfo.lgpwd !== '' && userinfo.check_lgpwd !== '' && userinfo.lgpwd === userinfo.check_lgpwd) {
      axios.post('../api/user/modify_user', param);
      alert('계정수정 완료');
      setOpen(false);
    } else {
      alert('계정수정 실패');
    }
  }

  return (
    <Modify>
      <Button
        variant="contained"
        style={{ width: 80, paddingBottom: 17, marginRight: 15, marginTop: 15 }}
        onClick={handleClickOpen}
      >
        <i className="edit icon" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>계정 정보 수정</DialogTitle>
        <DialogContent>
          <DialogContentText>수정할 정보를 입력해주세요</DialogContentText>
          <TextField
            margin="dense"
            label="ID"
            value={userinfo.loginname}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUserinfo((preUser) => ({ ...preUser, ['loginname']: e.target.value }));
            }}
          />
          <TextField
            margin="dense"
            label="암호"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUserinfo((preUser) => ({ ...preUser, ['lgpwd']: e.target.value }));
            }}
          />
          <TextField
            margin="dense"
            label="암호 확인"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUserinfo((preUser) => ({ ...preUser, ['check_lgpwd']: e.target.value }));
            }}
          />
          <TextField
            margin="dense"
            label="이름"
            value={userinfo.name}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUserinfo((preUser) => ({ ...preUser, ['name']: e.target.value }));
            }}
          />
          <TextField
            margin="dense"
            label="회사명"
            value={userinfo.company}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUserinfo((preUser) => ({ ...preUser, ['company']: e.target.value }));
            }}
          />
          <TextField
            margin="dense"
            label="연락처"
            value={userinfo.phone}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUserinfo((preUser) => ({ ...preUser, ['phone']: e.target.value }));
            }}
          />
          <TextField
            margin="dense"
            label="직업"
            value={userinfo.title}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUserinfo((preUser) => ({ ...preUser, ['title']: e.target.value }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose_modifyUser}>수정</Button>
        </DialogActions>
      </Dialog>
    </Modify>
  );
}
