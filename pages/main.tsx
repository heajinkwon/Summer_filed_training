// import { Status } from '@paljs/ui/types';
import { Card, CardBody } from '@paljs/ui/Card';
// import { Actions } from '@paljs/ui/Actions';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import styled from 'styled-components';
import React from 'react';
import Layout from 'Layouts';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AptTable from 'components/aptTable';
import TotalInspection from 'components/Inspection/totalInspection';
import InProgress from 'components/Inspection/InProgress';
import UserManageMui from '../../src/pages/auth/usermanage_mui';

const SubHeader = styled.div`
  font-size: 12px;
  float: right;
`;

export default function MainPage() {
  return (
    <Layout title="Home">
      <Row>
        <TotalInspection />
        <InProgress />
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>
              아파트 단지 상황
              <SubHeader>
                <Row>
                  <div>
                    <FiberManualRecordIcon style={{ margin: 8 }} color="error" />
                  </div>
                  <div style={{ margin: 8 }}> 오류 : 4 </div>
                  <div>
                    <FiberManualRecordIcon style={{ margin: 8 }} color="warning" />
                  </div>
                  <div style={{ margin: 8 }}>진행 : 20 </div>
                  <div>
                    <FiberManualRecordIcon style={{ margin: 8 }} color="success" />
                  </div>
                  <div style={{ margin: 8 }}>완료 : 104 </div>
                </Row>
              </SubHeader>
            </header>
            <CardBody>
              <AptTable />
            </CardBody>
          </Card>
        </Col>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>오류 메시지</header>
            <CardBody>
              <UserManageMui />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
