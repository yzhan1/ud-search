import * as React from 'react';
import WordList from './WordList';
import Item from '../interfaces/Item';
import Word from '../interfaces/Word';
import Form from '../components/Form';
import FooterContent from '../components/Footer';
import DataStorage from '../utils/Storage';
import { Layout, BackTop } from 'antd';
import '../styles/App.css';

const { Footer, Content } = Layout;

class App extends React.Component<{}, { items: Array<Item>, word: Array<Word> }> {
    constructor(props: React.Props<{}>) {
        super(props);
        this.state = {
            items: Array<Item>(),
            word: Array<Word>()
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(value: string): void {
        const searchText = value;
        if (searchText.length < 2) {
            return;
        }
        this.getData(searchText);
    }

    render() {
        return (
            <Layout className="App">
                <Form onSubmit={this.onSubmit} />
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

    private getData(value: string): void {
        const cacheHit = DataStorage.get(value);
        if (cacheHit) {
            // no API call if result has been cached and hasn't expire yet
            this.setState({ word: [JSON.parse(cacheHit)] });
        } else {
            fetch(`/api/define/${ value }`)
                .then(res => res.json())
                .then(result => this.onSetResult(result, value));
        }
    }

    private onSetResult(result: Word, key: string): void {
        DataStorage.set(key, JSON.stringify(result), 86400000);
        this.setState({ word: [result] });
    }
}

export default App;
