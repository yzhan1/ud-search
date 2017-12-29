import * as React from 'react';
import Form from './Form';

class Header extends React.Component {
    render() {
        return (
            <div className="App-header">
                <h1>UrbanDictionary Search</h1>
                <Form/>
            </div>
        );
    }
}

export default Header;