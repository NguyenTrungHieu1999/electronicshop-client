import Cookies from 'js-cookie';
import moment from 'moment';
import React, { Component } from 'react';
import { nameDecode, userIdDecode } from '../../services/DecodeService';
import Comments from './Comments';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      editText: ""
    }
  }
  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  }
  setExpland() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }

  setReplyComment(userName, id) {
    this.props.onReplyComment(userName, id);
  }

  setEditComment(text, id) {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
    this.props.onEditComment(text, id);
  }

  setDeleteComment(id){
    this.props.onDeleteComment(id);
  }

  render() {
    const { comment, userName, roles } = this.props;
    const { isCollapsed, editText } = this.state;
    let roleName = "";
    return (
      <React.Fragment>
        {comment.deleted === false &&
          <React.Fragment>
            {
              comment.parentId === null
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
                    {comment.status && Cookies.get('isAuth') &&
                      <React.Fragment>
                        <div className="comment-meta">
                          <button onClick={() => { this.setReplyComment(comment.user.userName, comment.id) }} className="comment-reply"><i className="fa fa-reply-all" aria-hidden="true" /> Trả lời</button>
                        </div>
                        {comment.user.userName === nameDecode &&
                          <React.Fragment>
                            <div className="comment-meta">
                              <button
                                className="collapse-button comment-reoly"
                                onClick={() => { this.setExpland(); this.setState({ editText: comment.text }) }}
                              >
                                <i className="fa fa-edit" aria-hidden="true" /> Chỉnh sửa
                              </button>
                            </div>
                            <div className="comment-meta">
                              <button onClick={() => { this.setDeleteComment(comment.id) }} className="comment-reply"><i className="far fa-trash-alt" aria-hidden="true" /> Xóa</button>
                            </div>
                          </React.Fragment>
                        }
                      </React.Fragment>
                    }
                  </div>
                  {comment.user.userName === nameDecode &&
                    <div
                      className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
                      aria-expanded={isCollapsed}
                      style={{ marginBottom: '70px' }}
                    >
                      <form className="register-form outer-top-xs">
                        <div className="form-group">
                          <textarea
                            rows={4}
                            type="text"
                            className="form-control unicase-form-control text-input"
                            id="edit"
                            name="editText"
                            value={editText}
                            onChange={this.onHandleChange}
                          />
                        </div>
                        <button onClick={() => { this.setEditComment(editText, comment.id) }} style={{ float: 'right', backgroundColor: 'blue' }} type="button" className="btn btn-primary">Gửi</button>
                      </form>
                    </div>
                  }
                </React.Fragment>
                :
                <React.Fragment>
                  <div className="comment-box replied">
                    <span className="commenter-pic">
                      <img src="/assets/images/avatar.png" className="img-fluid" />
                    </span>
                    <span className="commenter-name">
                      {roles.map((role) => {
                        if (role.userId === comment.userId && role.roleId !== 3) {
                          roleName = "Nhân viên tư vấn";
                        }
                      })}
                      <a>{comment.user.userName}</a> <sup><i style={{ color: 'red' }}>{roleName}</i></sup> <span className="comment-time">{moment(comment.createdDate).format('DD/MM/yyyy hh:mm:ss')}</span>
                    </span>
                    <p className="comment-txt more">
                      {comment.status
                        ?
                        <React.Fragment>
                          {userName === nameDecode
                            ? ""
                            : <i style={{ color: 'blue' }}>{userName} </i>
                          }
                          {comment.text}
                        </React.Fragment>
                        :
                        <i>***Bình luận chứa nội dung không phù hợp***</i>
                      }
                    </p>
                    {comment.status && Cookies.get('isAuth') &&
                      <React.Fragment>
                        <div className="comment-meta">
                          <button onClick={() => { this.setReplyComment(comment.user.userName, comment.id) }} className="comment-reply"><i className="fa fa-reply-all" aria-hidden="true" /> Trả lời</button>
                        </div>
                        {comment.user.userName === nameDecode &&
                          <React.Fragment>
                            <div className="comment-meta">
                              <button
                                className="collapse-button comment-reoly"
                                onClick={() => { this.setExpland(); this.setState({ editText: comment.text }) }}
                              >
                                <i className="fa fa-edit" aria-hidden="true" /> Chỉnh sửa
                              </button>
                            </div>
                            <div className="comment-meta">
                              <button onClick={() => { this.setDeleteComment(comment.id) }} className="comment-reply"><i className="far fa-trash-alt" aria-hidden="true" /> Xóa</button>
                            </div>
                          </React.Fragment>
                        }
                      </React.Fragment>
                    }
                    {comment.user.userName === nameDecode &&
                      <div
                        className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
                        aria-expanded={isCollapsed}
                        style={{ marginBottom: '70px' }}
                      >
                        <form className="register-form outer-top-xs">
                          <div className="form-group">
                            <textarea
                              value={editText}
                              rows={4}
                              type="text"
                              className="form-control unicase-form-control text-input"
                              id="edit"
                              name="editText"
                              onChange={this.onHandleChange}
                            />
                          </div>
                          <button onClick={() => { this.setEditComment(editText, comment.id) }} style={{ float: 'right', backgroundColor: 'blue' }} type="button" className="btn btn-primary">Gửi</button>
                        </form>
                      </div>
                    }
                  </div>
                </React.Fragment>
            }
            <Comments roles={roles} onDeleteComment={this.props.onDeleteComment} onEditComment={this.props.onEditComment} onReplyComment={this.props.onReplyComment} userName={comment.user.userName} comments={comment.children} />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default Comment;