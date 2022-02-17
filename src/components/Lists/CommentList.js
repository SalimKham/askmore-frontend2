/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment, getComments, deleteComment } from '../../actions/CommentAction'

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            contentReplay: "",
            idReplay: 0
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.createCommentList = this.createCommentList.bind(this);
        this.setReplayID = this.setReplayID.bind(this);
    }
    setReplayID(id) {
        this.setState({ idReplay: id });
    }
    componentDidMount() {
        console.log("comment list");
        this.props.getComments(this.props.parent);
    }
    deleteComment(id) {
        this.props.deleteComment(id);
    }
    ShowQuote(list, id) {
        let item = [];
        if (list.length > 0) {
            list.map(comment => {
                if (comment.id === id) {
                    item.push(

                        <div class="media border quote" style={{ margin: '0 20px' }}>
                            <i class="fa fa-quote-left" style={{color:'#13BE00'}} aria-hidden="true"></i>
                            <div class="media-body">
                                <div>@{comment.user.username} <small><i>on {comment.createdAt}</i></small></div>
                                <p> {comment.content}</p>
                                </div>
                                </div>
                       )

                }
                return null
            })
        }
        return item;
    }
    createCommentList() {
        let listItems = [];
        const list = this.props.comment.comments;
        if (list.length > 0) {
            list.map(comment => {
                const image = comment.user.userInfo.photo ? comment.user.userInfo.photo : "/images/no-avatar.th.png"
                listItems.push(
                    <div class="media border p-1" style={{marginBottom:'10px'}}>
                        <a onClick={this.setReplayID.bind(this, comment.id)} class="right reply-small-icon" title="Reply" ></a>
                        <a class="right delete-small-icon" title="Delete" onClick={this.deleteComment.bind(this, comment.id)}></a>
                        <img src={image} alt="John Doe" class="mr-2 mt-2 rounded-circle" style={{ width: "45px" }} />
                        <div class="media-body">
                            <div> @{comment.user.username} <small><i> on {comment.createdAt}</i></small></div>
                            <p>{comment.content}</p>
                            {comment.idReplay !== 0 && this.ShowQuote(list, comment.idReplay)}
                            {this.state.idReplay === comment.id && this.showCommentForm(2)}

                        </div>
                    </div>
                )
                return null
            })


        }
        return listItems;
    }
    onSubmit(e) {

        e.preventDefault();
        const comment = {
            idReplay: ("" + e.target.id === '1' ? 0 : this.state.idReplay),
            content: ("" + e.target.id === '1' ? this.state.content : this.state.contentReplay)
        }
        this.setState({ content: "", contentReplay: "", idReplay: 0 });




        this.props.addComment(this.props.parent, comment);
        console.log(this.props.parent)


    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }
    cancelReplay() {
        this.setState({ idReplay: 0 })
    }

    showCommentForm(type) {
        const image = this.props.user.user && this.props.user.user.photo ? (this.props.user.user.photo) : "/images/no-avatar.th.png"
        return (
            <form class="" onSubmit={this.onSubmit} id={type}>
                <div class="media border p-1 ">
                    {("" + type) === '1' && <img src={image} alt="John Doe" class="mr-1 mt-1 rounded-circle" style={{ width: '45px' }} />}
                    {this.state.idReplay !== 0 && <a onClick={this.cancelReplay.bind(this)} class="delete-small-icon right" title="Delete"></a>}
                       <div  >
                            <button type="submit" className="btn btn-sm float-end" style={{backgroundColor:"#13BE00"}} > <i class="fa fa-share-square" aria-hidden="true"></i> </button>
                        </div>
                    <div class="media-body ">
                        <textarea style={{ marginLeft: '30px' }} placeholder="add your comment here ..." name={(("" + type) === '1') ? "content" : "contentReplay"} enter_valid value={(("" + type) === '1') ? this.state.content : this.contentReplay}  onChange={this.onChange} ></textarea>
                        
                    </div>

                </div>


            </form>
        )
    }
    render() {

        return (
            <div class="container " style={{marginBottom:'30px'}}>
                <small class="icon-h3 add-comment">LEAVE REPLY : </small>
                {this.showCommentForm(1)}
                <br />

                <small class="icon-h3 comments">COMMENTS : </small>

                {this.createCommentList()}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.security,
    comment: state.comment
});
export default connect(mapStateToProps, { deleteComment, getComments, addComment })(CommentList)
