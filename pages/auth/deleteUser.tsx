import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

const Delete = styled.div`
  font-size: 12px;
  float: right;
`;

export default function DeleteUser(props) {
  function deleteUser() {
    var param = {
      deleteuser: props.selectdata,
    };
    //console.log('deleteuser:props : ', param);

    axios.post('../api/user/delete_loginhistory_user', param); //foreign key 오류로 loginhistory table 삭제 후
    axios.post('../api/user/delete_user', param); // sc_user
  }

  return (
    <Delete>
      <Button
        variant="contained"
        onClick={deleteUser}
        style={{ width: 80, paddingBottom: 17, marginRight: 15, marginTop: 15 }}
      >
        <i className="x icon" />
      </Button>
    </Delete>
  );
}
