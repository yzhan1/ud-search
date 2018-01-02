import * as React from 'react';
import { Row, Col } from 'antd';

const logo = require('../logo.png');

class Header extends React.Component {
    render() {
        return (
            <Row>
                <Col span={1}>
                    <img src={logo} alt={'logo'} style={{ height: 43 }}/> 
                </Col>
                <Col span={22}>
                    <h1 className="header-text"><strong>UrbanDictionary Search</strong></h1>
                </Col>
                <Col span={1}>
                    <a href={'https://github.com/zhanym0981/ud-search'} style={{color: '#EFFF00'}} target="_blank">
                        <p><strong>Github</strong></p>
                    </a>
                </Col>
            </Row>
        );
    }
}

export default Header;