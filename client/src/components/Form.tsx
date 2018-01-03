import * as React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import Header from './Header';

class Form extends React.Component<{ onSubmit: Function }, {}> {
    state = {
        dataSource: [],
    };

    constructor(props: { onSubmit: Function }) {
        super(props);
    }

    handleSearch = (value: string) => {
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    }

    render() {
        return (
            <div className="App-header">
                <Header/>
                <div className="search-bar">
                    <AutoComplete
                        className="search"
                        dataSource={this.state.dataSource}
                        onSearch={value => this.props.onSubmit(value)}
                        placeholder="Input search text"
                        size="large"
                    >
                        <Input size="large" suffix={<Icon type="search" />} />
                    </AutoComplete>
                </div>
            </div>
        );
    }
}

export default Form;