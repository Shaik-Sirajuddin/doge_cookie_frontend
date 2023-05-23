import React from 'react'
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
export const AuditSpace = () => {
    return (
        <div>
            <h2> 100% Trusted and Audited by the following third parties:</h2>
            <div className='container' style={{marginBlock:'10px'}}>
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://cdn.dribbble.com/userupload/3158903/file/original-3f5abe8b99ff4ba4626ddf6660115182.jpg?compress=1&resize=752x" />
                            <Card.Body>
                                <Card.Title>Secure</Card.Title>
                                <Card.Text>
                                Complete
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://cdn.dribbble.com/userupload/3158903/file/original-3f5abe8b99ff4ba4626ddf6660115182.jpg?compress=1&resize=752x" />
                            <Card.Body>
                                <Card.Title>Fast</Card.Title>
                                <Card.Text>
                                Complete
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://cdn.dribbble.com/userupload/3158903/file/original-3f5abe8b99ff4ba4626ddf6660115182.jpg?compress=1&resize=752x" />
                            <Card.Body>
                                <Card.Title>Reliable</Card.Title>
                                <Card.Text>
                                Complete
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
            </div>
        </div>
    )
}

// export default AuditSpace