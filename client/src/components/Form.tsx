import * as React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import Header from './Header';

class Form extends React.Component<{ onSubmit: Function, dataSource: Array<string> }, {}> {
    constructor(props: { onSubmit: Function, dataSource: Array<string> }) {
        super(props);
    }

    render() {
        return (
            <div className="App-header">
                <Header/>
                <div className="search-bar">
                    <AutoComplete
                        className="search"
                        dataSource={this.props.dataSource}
                        onSearch={value => this.props.onSubmit(value)}
                        onSelect={(value, option) => this.props.onSubmit(value)}
                        placeholder="Input search text"
                        size="large"
                        filterOption={(value, option: any) => 
                            option.props.children.toUpperCase().indexOf(value.toUpperCase()) !== -1
                        }
                    >
                        <Input size="large" suffix={<Icon type="search" />} />
                    </AutoComplete>
                </div>
            </div>
        );
    }
}

export default Form;