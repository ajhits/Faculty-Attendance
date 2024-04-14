
// reactstrap components
import { getHistoryToday } from "../../firebase/Database";
import React, { useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {

  const [total,setTotal] = useState({
    TimeIn: 0,
    TimeOut: 0
  })
  const getFormattedDate = () => {
    const today = new Date();
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };

  function calculateGrandTotal(data) {
    const users = Object.keys(data).filter(key => key !== "No match detected");


  
    let totalInCount = 0;
    let totalOutCount = 0;
  
    users.forEach(user => {
      const entries = data[user];

      Object.keys(entries).forEach(entry => {

        // I get undefined on this
        if (entry === 'Time In'){
          totalInCount += 1;
        }

        if (entry === 'Time In'){
          totalOutCount += 1;
        }

      });
    });
  
    return {
      TimeIn: totalInCount,
      TimeOut: totalOutCount
    };
  }
  
  React.useEffect(()=>{

    getHistoryToday(String(getFormattedDate()).replace(",",""))
    .then(data=>{
      setTotal(calculateGrandTotal(data))
    }).catch(error=>console.log(error))
  },[])
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Entries Today
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {total.TimeIn}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Exit Today
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {total.TimeOut}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    
                  </CardBody>
                </Card>
              </Col>

              {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Temperature Today
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">36^</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  
                  </CardBody>
                </Card>
              </Col> */}

              {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Registered Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">2</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col> */}

            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
