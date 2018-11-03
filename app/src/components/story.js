import React, { Component } from 'react'
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import StoryItem from './story-item'

export default class Story extends Component {
    state = {
        _list: [],
        items: [],
        count: 0,
        type: 'topstories'
    };

    componentDidMount = () => {
        this.getFirsData();
    }

    getFirsData = async () => {
        this.setState({
            _list: await axios.get(`https://hacker-news.firebaseio.com/v0/${this.state.type}.json?print=pretty`)
        });

        this.state._list.data.slice(this.state.count, this.state.count + 20).map(async (item) => {
            const _item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`);
            let _arr = this.state.items;

            _arr.push(_item.data);

            this.setState({
                items: _arr
            });
        });

        this.setState({ count: 20 });
    }

    fetchMoreData = async () => {
        setTimeout(async () => {

            this.state._list.data.slice(this.state.count, this.state.count + 20).map(async (item) => {
                const _item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`);
                let _arr = this.state.items;

                _arr.push(_item.data);

                this.setState({
                    items: _arr
                });
            });

            this.setState({ count: this.state.count + 20 });
        }, 1500);
    };

    switchSotires(type) {
        this.setState({
            type: type,
            _list: [],
            items: []
        });

        this.getFirsData();
    }

    render() {

        return (
            this.props.user ?
                <div className="box">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <div className="hacker-logo">
                                    <img src="Y-120-ff6600.png" alt="hacker-logo" />
                                    <span className="story-hacker-name">HACKER NEWS</span>
                                </div>
                            </div>
                            <div className="col-9">
                                <div>
                                    <button className={"btn-top-stories " + (this.state.type === 'topstories' ? 'active-btn' : '')} onClick={() => this.switchSotires('topstories')}>Top Stories</button>
                                    <button className={"btn-new-stories " + (this.state.type === 'newstories' ? 'active-btn' : '')} onClick={() => this.switchSotires('newstories')}>New Stories</button>
                                    <button className={"btn-best-stories " + (this.state.type === 'beststories' ? 'active-btn' : '')} onClick={() => this.switchSotires('beststories')}>Best Stories</button>
                                </div>
                            </div>
                        </div>
                        <div className="row infinite-scroll">
                            <InfiniteScroll
                                height={'55vh'}
                                dataLength={this.state.items.length}
                                next={this.fetchMoreData}
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                            >
                                {this.state.items.map((i, index) => (
                                    <StoryItem item={i} key={index} />
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
                : ''
        )
    }
}