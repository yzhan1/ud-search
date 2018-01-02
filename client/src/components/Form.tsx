import * as React from 'react';
import { Input } from 'antd';
import Header from './Header';

const Search = Input.Search;

class Form extends React.Component<{ onSubmit: Function }, {}> {
    constructor(props: { onSubmit: Function }) {
        super(props);
    }

    render() {
        return (
            <div className="App-header">
                <Header/>
                <div className="search-bar">
                    <Search
                        className="search"
                        placeholder="Input search text"
                        onSearch={value => this.props.onSubmit(value)}
                        size="large"
                    />
                </div>
            </div>
        );
    }
}

export default Form;