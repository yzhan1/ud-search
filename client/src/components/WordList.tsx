import * as React from 'react';
import { Alert, Tag, Row, Col } from 'antd';
import Item from '../interfaces/Item';
import Word from '../interfaces/Word';
import WordCard from './WordCard';

const uuidv1 = require('uuid/v1');

class WordList extends React.Component<{ items: Array<Item>, word: Array<Word> }, 
                                       { items: Array<Item>, word: Array<Word> }> {
    constructor(props: { items: Array<Item>, word: Array<Word> }) {
        super(props);
        this.state = {
            items: Array<Item>(),
            word: Array<Word>()
        };
    }

    componentDidMount(): void {
        fetch('/api/random')
            .then(res => res.json())
            .then(items => this.setState({ items: items.list }));
    }

    componentWillReceiveProps(nextProps: { items: Array<Item>, word: Array<Word> }) {
        this.setState({ word: nextProps.word });
    }

    render() {
        const data = this.props.word[0];
        if (data !== undefined) {
            return this.renderWord(data);
        } else {
            return (
                <div>
                    <Alert message="Let's get started with some random definitions :)" type="info" showIcon={true} />
                    {this.renderItems(this.state.items)}
                </div>
            );
        }
    }

    private renderItems = (items: Array<Item>) => {
        return (
            <div className="word-list">
                {items.map(item => {
                    return <WordCard item={item} key={uuidv1()} />;
                })}
            </div>
        );
    }

    private renderWordHeader = (word: Word) => {
        return (
            <Row>
                <Col span={3}>
                    <h2><strong>Tags</strong></h2>
                </Col>
                <Col span={21}>
                    {word.tags.slice(0, 8).map(tag => {
                        return (
                            <Tag color="cyan" key={uuidv1()} style={{ marginTop: 3 }}>{tag}</Tag>
                        );
                    })}
                </Col>
            </Row>
        );
    }

    private renderWord = (word: Word) => {
        if (word.result_type === 'no_results') {
            return (
                <Alert 
                    message="No results found. Please try another word." 
                    type="warning" 
                    showIcon={true} 
                    style={{ width: 800 }} 
                />
            );
        } else {
            return (
                <div className="word-list">
                    <Alert 
                        message={`Found ${ word.list.length } match(es)`} 
                        type="success" 
                        showIcon={true} 
                        style={{ marginBottom: 40 }} 
                    />
                    {this.renderWordHeader(word)}
                    {this.renderItems(word.list)}
                </div>
            );
        }
    }
}

export default WordList;