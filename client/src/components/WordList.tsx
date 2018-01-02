import * as React from 'react';
import Item from '../interfaces/Item';
import Word from '../interfaces/Word';
import { Card, Rate, Tag, Row, Col } from 'antd';
import { calculateRate } from '../utils/util';

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
            .then(items => {
                this.setState({ items: items.list });
            });
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({ word: nextProps.word });
    }

    render() {
        const data = this.props.word[0];
        if (data !== undefined) {
            return this.renderWord(data);
        } else {
            return this.renderItems(this.state.items);
        }
    }

    private renderItems(items: Array<Item>) {
        return (
            <div className="word-list">
                {items.map(item => {
                    return (
                        <Card 
                            key={item.defid} 
                            title={item.word} 
                            className="word-card"
                            bordered={false}
                        >
                            <p>{item.definition}</p>
                            <p>{item.example}</p>
                            <p>{item.author}</p>
                            <Rate disabled defaultValue={calculateRate(item.thumbs_up, item.thumbs_down)} />
                        </Card>
                    );
                })}
            </div>
        );
    }

    private renderWordHeader(word: Word) {
        return (
            <Row>
                <Col span={3}>
                    <h2><strong>Tags</strong></h2>
                </Col>
                <Col span={21}>
                    {word.tags.slice(0, 8).map(tag => {
                        return (
                            <Tag color="green" key={tag} style={{ marginTop: 3 }}>{tag}</Tag>
                        );
                    })}
                </Col>
            </Row>
        );
    }

    private renderWord(word: Word) {
        if (word.result_type === 'no_results') {
            return this.renderNoMatch();
        }
        return (
            <div className="word-list">
                {this.renderWordHeader(word)}
                {this.renderItems(word.list)}
            </div>
        );
    }

    private renderNoMatch() {
        return (
            <Card 
                key="no-result" 
                title="No Result Found" 
                className="word-card"
                bordered={false}
            >
                <p>Sorry, please try another word.</p>
            </Card>
        );
    }
}

export default WordList;