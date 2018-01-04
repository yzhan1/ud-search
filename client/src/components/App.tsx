import * as React from 'react';
import { Layout, BackTop } from 'antd';
import WordList from './WordList';
import Item from '../interfaces/Item';
import Word from '../interfaces/Word';
import Form from '../components/Form';
import FooterContent from '../components/Footer';
import DataStorage from '../utils/Storage';
import '../styles/App.css';

const { Footer, Content } = Layout;

let timer: any;

class App extends React.Component<{}, { items: Array<Item>, word: Array<Word>, dataSource: Array<string> }> {
    constructor(props: React.Props<{}>) {
        super(props);
        this.state = {
            items: Array<Item>(),
            word: Array<Word>(),
            dataSource: Array<string>()
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ dataSource: DataStorage.getHistory() });
    }

    onSubmit = (value: string): void => {
        if (timer) {
            clearInterval(timer);
        }
        // search only after user stopped typing for 500 ms
        timer = setTimeout(() => this.debouncedSearch(value), 500);
    }

    render() {
        return (
            <Layout className="App">
                <Form onSubmit={this.onSubmit} dataSource={this.state.dataSource} />
                <Content className="content">
                    <WordList items={this.state.items} word={this.state.word} />
                </Content>
                <Footer className="footer">
                    <FooterContent />
                </Footer>
                <BackTop />
            </Layout>
        );
    }

    private debouncedSearch = (value: string): void => {
        if (value.length < 2) {
            return;
        }
        this.getData(value);
    }

    private getData = (value: string): void => {
        const cacheHit = DataStorage.get(value);
        if (cacheHit) {
            // no API call if result has been cached and hasn't expire yet
            this.setState({ word: [JSON.parse(cacheHit)] });
        } else {
            if (value.length > 2) {
                DataStorage.saveHistory(value);
                this.setState({ dataSource: DataStorage.getHistory() });
            }
            fetch(`/api/define/${ value }`)
                .then(res => res.json())
                .then(result => this.onSetResult(result, value));
        }
    }

    private onSetResult = (result: Word, key: string): void => {
        DataStorage.set(key, JSON.stringify(result), 86400000);
        this.setState({ word: [result] });
    }
}

export default App;
