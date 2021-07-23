import moment from 'moment';
import React, { Component } from 'react';
import { userIdDecode } from '../../services/DecodeService';
import Comments from './Comments';

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  setReplyComment(userName, id) {
    this.props.onReplyComment(userName, id);
  }

  render() {
    const { comment, userName } = this.props;
    debugger;
    return (
      <React.Fragment>
        {comment.parentId === null
          ?
          <React.Fragment>
            <div className="comment-box">
              <span className="commenter-pic">
                <img src="/assets/images/avatar.png" className="img-fluid" />
              </span>
              <span className="commenter-name">
                <a>{comment.user.userName}</a> <span className="comment-time">{moment(comment.createdDate).format('DD/MM/yyyy hh:mm:ss')}</span>
              </span>
              <p className="comment-txt more">{comment.status ? comment.text : <i>***Bình luận chứa nội dung không phù hợp***</i>}</p>
              {comment.status &&
                <React.Fragment>
                  {comment.userId !== parseInt(userIdDecode)
                    ?
                    <div className="comment-meta">
                      <button onClick={() => { this.setReplyComment(comment.user.userName, comment.id) }} className="comment-reply"><i className="fa fa-reply-all" aria-hidden="true" /> Trả lời</button>
                    </div>
                    :
                    <div className="comment-meta">
                      {/* <button className="comment-reoly"><i className="fa fa-edit" aria-hidden="true" /> Chỉnh sửa</button> */}
                    </div>
                  }
                </React.Fragment>
              }
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <div className="comment-box replied">
              <span className="commenter-pic">
                <img src="/assets/images/avatar.png" className="img-fluid" />
              </span>
              <span className="commenter-name">
                <a>{comment.user.userName}</a> <span className="comment-time">{moment(comment.createdDate).format('DD/MM/yyyy hh:mm:ss')}</span>
              </span>
              <p className="comment-txt more">{comment.status ? <React.Fragment> <i style={{ color: 'blue' }}>{userName}</i> {comment.text}</React.Fragment> : <i>***Bình luận chứa nội dung không phù hợp***</i>}</p>
              {comment.status &&
                <React.Fragment>
                  {comment.userId !== parseInt(userIdDecode)
                    ?
                    <div className="comment-meta">
                      <button onClick={() => { this.setReplyComment(comment.user.userName, comment.id) }} className="comment-reply"><i className="fa fa-reply-all" aria-hidden="true" /> Trả lời</button>
                    </div>
                    :
                    <div className="comment-meta">
                      {/* <button className="comment-reoly"><i className="fa fa-edit" aria-hidden="true" /> Chỉnh sửa</button> */}
                    </div>
                  }
                </React.Fragment>
              }
            </div>
          </React.Fragment>
        }
        <Comments userName={comment.user.userName} comments={comment.children} />
      </React.Fragment>
    );
  }
}

export default Comment;