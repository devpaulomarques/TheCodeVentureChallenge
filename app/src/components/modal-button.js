import React from 'react';
import Modal from 'react-modal';
import * as moment from 'moment'
import Comment from './comment'

Modal.setAppElement('#root')

const customStyles = {
    content: {
        backgroundColor: 'rgb(246, 246, 239)'
    }
};

export default class ModalButton extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <span>
                <a onClick={this.openModal} href="#/">
                    <svg id="icon-bubble" viewBox="0 0 1024 1024" width="5%" height="100%" fill="#999999">
                        <title>Comments</title>
                        <path className="path1" d="M512 224c8.832 0 16 7.168 16 16s-7.2 16-16 16c-170.464 0-320 89.728-320 192 0 8.832-7.168 16-16 16s-16-7.168-16-16c0-121.408 161.184-224 352-224zM512 64c-282.784 0-512 171.936-512 384 0 132.064 88.928 248.512 224.256 317.632 0 0.864-0.256 1.44-0.256 2.368 0 57.376-42.848 119.136-61.696 151.552 0.032 0 0.064 0 0.064 0-1.504 3.52-2.368 7.392-2.368 11.456 0 16 12.96 28.992 28.992 28.992 3.008 0 8.288-0.8 8.16-0.448 100-16.384 194.208-108.256 216.096-134.88 31.968 4.704 64.928 7.328 98.752 7.328 282.72 0 512-171.936 512-384s-229.248-384-512-384zM512 768c-29.344 0-59.456-2.24-89.472-6.624-3.104-0.512-6.208-0.672-9.28-0.672-19.008 0-37.216 8.448-49.472 23.36-13.696 16.672-52.672 53.888-98.72 81.248 12.48-28.64 22.24-60.736 22.912-93.824 0.192-2.048 0.288-4.128 0.288-5.888 0-24.064-13.472-46.048-34.88-56.992-118.592-60.544-189.376-157.984-189.376-260.608 0-176.448 200.96-320 448-320 246.976 0 448 143.552 448 320s-200.992 320-448 320z"></path>
                    </svg>
                    <span className="numero">{this.props.item.descendants} Comments</span>
                </a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <button className="modal-close" onClick={this.closeModal}>X</button>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <span ref={subtitle => this.subtitle = subtitle}>
                                    {this.props.item.title}
                                </span>
                                <br />
                                <small>
                                    {this.props.item.score} Points by {this.props.item.by} | {moment.unix(this.props.item.time).fromNow()} | {this.props.item.descendants} Comments
                                </small>
                                <br />
                                <br />

                                {this.props.item.kids ? this.props.item.kids.map((kid, index) => <Comment item={kid} key={index} level={0} />) : null}

                            </div>
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }
}