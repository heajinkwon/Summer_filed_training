import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React, { useEffect } from 'react';
import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import crypto from 'crypto-js';
import { GetServerSideProps } from 'next';
import { setCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';

const AddBtn = styled.div`
  font-size: 12px;
  text-align: center;
`;
const Size = styled.p`
  font-size: 36px;
  font-weight: 600;
  font-family: 'Malgun Gothic';
`;

//ip 정보 가져오기 - 수정 필요
// export const getServerSideProps : GetServerSideProps = async ({ req }) => {
// const ip =  req.socket.remoteAddress;
//   console.log("ip : ",ip);
// return {
//     props: {
//         ip,
//       }, // will be passed to the page component as props
//     };
//   }

export default function Login() {
  const router = useRouter();

  const [loginname, setloginname] = useState('');
  const [password, setPassword] = useState('');

  var userno = 0;
  var loginstatus = '';

  let i = 0;

  function Islogin() {
    axios.get('../api/auth').then((res) => {
      try {
        for (
          i = 0;
          i < res.data.result.length;
          i++ // db내 같은 loginname 우선 확인
        ) {
          if (res.data.result[i].loginname === loginname) {
            //console.log(res.data.result[i].loginname);
            break;
          }
        }

        // // db내 lgpwd 복호화
        if (
          res.data.result[i] &&
          res.data.result[i].loginname === loginname &&
          res.data.result[i].lgpwd === crypto.SHA256(password).toString()
        ) {
          router.push('/'); // 메인페이지 이동,, 로그인 성공
          console.log('로그인 성공');
          userno = res.data.result[i].userno;
          loginstatus = 'y';
          setCookie('loginname', loginname);

          axios.get('../api/auth').then((res) => {
            const _input = res.data.result.map((rowData: any) => ({
              userno: rowData.userno,
              loginname: rowData.loginname,
              name: rowData.name,
              company: rowData.company,
              phone: rowData.phone,
              title: rowData.title,
            }));

            for (let i = 1; i < _input.length; i++) {
              if (_input[i].loginname === getCookie('loginname')) {
                setCookie('title', _input[i].title);
              }
            }
          });

          AddLoginHistory();
        } else {
          //로그인 실패
          alert('로그인 실패');
          console.log('로그인 실패');
          router.push('/auth/login');
          if (res.data.result[i].loginname === loginname) {
            // loginname은 일치하는 경우, userno값 sc_user table에서 가져와서
            // sc_login_history insert
            userno = res.data.result[i].userno;
            loginstatus = 'n';
            AddLoginHistory();
          } else {
            userno = 0;
            console.log('loginname 일치하는 사용자 없음');
          } // loginname 일치하지 않는 경우, userno foreignkey error로 sc_login_history db에 저장 X
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  function AddLoginHistory() {
    var param = {
      login_status: loginstatus,
      userno: userno,
    };
    axios.post('../api/user/user_manage', param);
  }

  return (
    <Layout title="Login_History">
      <Auth title="OO단지 전수 검사 프로그램" subTitle="자이 S&D">
        {/* <div>
          <Size>자이 S&D</Size>
          </div>
          <style jsx>
          {`
          div{
            text-align: center;
            margin-top:3%
            margin-bottom : 12%
          }`}
        </style> */}
        <form>
          <InputGroup fullWidth>
            <input
              type="text"
              placeholder="User ID"
              onChange={(e) => {
                setloginname(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup fullWidth>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputGroup>
          <AddBtn>
            <Button status="Info" type="button" shape="SemiRound" onClick={Islogin}>
              {' '}
              로그인{' '}
            </Button>
          </AddBtn>
        </form>
      </Auth>
    </Layout>
  );
}
