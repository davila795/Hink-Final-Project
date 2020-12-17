import React, { Component } from "react"
import MeetingService from '../../../../services/meetings.service'
import Alert from '../../../shared/alert/Alert'

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: {
                name: props.loggedUser._id,
                message: ""
            },
            showToast: false,
            toastText: '',
            toastColor: ''
        }
        this.meetingService = new MeetingService()
    }

    handleInputChange = e => this.setState({ comment: { ...this.state.comment, [e.target.name]: e.target.value } })

    handleSubmit = e => {

        e.preventDefault()
        this.meetingService
            .addComment(this.props.meetingId, this.state.comment)
            .then(response => this.props.updateMeeting())
            .catch(err => this.handleToast(true, err.response.data.message, '#ef7a7a'))
    }

    handleToast = (visible, text, color) => this.setState({ showToast: visible, toastText: text, toastColor: color })

    render() {
        return (
            <>
                <React.Fragment>
                    {this.state.comment.name &&
                        <form method="post" onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <textarea
                                    onChange={this.handleInputChange}
                                    value={this.state.comment.message}
                                    className="form-control"
                                    placeholder="🤬 Your Comment"
                                    name="message"
                                    rows="5"
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-info" type='submit'>
                                    Comment ➤
                            </button>
                            </div>
                        </form>
                    }
                </React.Fragment>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} toastColor={this.state.toastColor} />
            </>
        )
    }
}