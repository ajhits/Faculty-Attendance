import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
    UncontrolledTooltip,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const Feed = () => {
    const [showFeeds, setShowFeeds] = useState(false); // State to track feed activation

    const handleToggleFeeds = () => {
        setShowFeeds(!showFeeds); // Toggle feed display
    };

    return (
        <div>
            <Header />

            {/* Card to display camera feeds */}
            <Container className="mt--7" fluid>
                <Row className="justify-content-center">
                    <Col lg="6" className="mb-5 mb-xl-0">
                        <Card className="card-profile shadow">
                            <CardHeader className="text-center border-0">
                                <h3 className="mb-0">Camera Feeds</h3>
                            </CardHeader>
                            <CardBody>
                                {/* Button to toggle feed display */}
                                <div className="text-center">
                                    <Button color="primary" onClick={handleToggleFeeds}>
                                        {showFeeds ? 'Hide Feeds' : 'View Feeds'}
                                    </Button>
                                </div>
                                {/* Conditionally render camera feeds */}
                                {showFeeds && (
                                    <>
                                        {/* Canvas elements for camera feeds */}
                                        <div className="text-center">
                                            <canvas id="cameraFeed1" width="640" height="480"></canvas>
                                            <canvas id="cameraFeed2" width="640" height="480"></canvas>
                                        </div>
                                    </>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Feed;
