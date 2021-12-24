import React, { useContext, useState } from 'react'
import "./Comment.css"
import Reply from '../../images/icon-reply.svg'
import Delete from '../../images/icon-delete.svg'
import Edit from '../../images/icon-edit.svg'
import { DataContext } from '../../provider'
import CommentInput from '../CommentInput/CommentInput'

const Comment = ({ comment, reload, isReply = false, reloadApp }) => {
    // console.log('Building Comment', comment)
    const [comments, setComments] = useContext(DataContext);
    const [currentUser, setCurrentUser] = useState(comment.user.username === comments.currentUser.username);
    const [showInput, setShowInput] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    function hideInput() {
        setShowInput(false)
        setShowEdit(false)
        reload();
    }

    function deleteComment() {
        setComments(prevComments => {
            if (isReply) {
                for (let i = 0; i < prevComments.comments.length; i++) {
                    let commentItem = prevComments.comments[i];
                    for (let j = 0; j < commentItem.replies.length; j++) {
                        let replyItem = commentItem.replies[j];
                        if (replyItem.content === comment.content) {
                            delete prevComments.comments[i].replies[j];
                            break;
                        }
                    }
                }
            } else {
                for (let i = 0; i < prevComments.comments.length; i++) {
                    let commentItem = prevComments.comments[i];
                    console.log(commentItem)
                    if (commentItem.content === comment.content) {
                        console.log(commentItem.content === comment.content, i)
                        console.log(comment.content)
                        prevComments.comments = prevComments.comments.filter(item => item.content !== comment.content)
                        break;
                    }
                }
                console.log(prevComments)
            }
            return prevComments;
        })
        setShowDelete();
        reload();
        try {
            reloadApp();
        } catch (e) { }
    }

    function increment() {
        setComments(prevComments => {
            if (isReply) {
                prevComments.comments.forEach(item => {
                    item.replies.forEach(reply => {
                        if (reply.content === comment.content) {
                            reply.score++;
                            return;
                        }
                    });
                });
            } else {
                prevComments.comments.forEach(item => {
                    if (item.content === comment.content) {
                        item.score++;
                        return;
                    }
                });
            }
            return prevComments;
        })
        reload();
    }

    function decrement() {
        setComments(prevComments => {
            if (isReply) {
                prevComments.comments.forEach(item => {
                    item.replies.forEach(reply => {
                        if (reply.content === comment.content) {
                            reply.score--;
                            return;
                        }
                    });
                });
            } else {
                prevComments.comments.forEach(item => {
                    if (item.content === comment.content) {
                        item.score--;
                        return;
                    }
                });
            }
            return prevComments;
        })
        reload();
    }
    return <div className="comment__item">
        <div className="comment__item-main">
            <div className="comment__item-buttons">
                <button onClick={increment} className="add">+</button>
                <span className="number">{comment.score}</span>
                <button onClick={decrement} className="subtract">-</button>
            </div>
            <div className="comment__item-box">
                <div className="comment__item-box__details">
                    <div className='comment__item-box__details-left'>
                        <img src={comment.user.image.png} alt={comment.user.username} className="comment__item-box__details-image" />
                        <p className="comment__item-box__details-name">{comment.user.username}</p>
                        {comment.user.username === comments.currentUser.username ?
                            <p className="comment__item-box__details-owner">you</p>
                            : <span></span>
                        }
                        <p className="comment__item-box__details-time">{comment.createdAt}</p>
                    </div>
                    <div className='comment__item-box__details-right'>
                        {comment.user.username === comments.currentUser.username ?
                            <>
                                <button onClick={() => setShowDelete(!showDelete)} className="comment__item-box__details-delete">
                                    <img src={Delete} alt="reply" />
                                    Delete
                                </button>
                                <button onClick={() => setShowEdit(!showEdit)} className="comment__item-box__details-edit">
                                    <img src={Edit} alt="reply" />
                                    Edit
                                </button>
                            </>
                            : <>
                                {!isReply ? <button onClick={() => setShowInput(!showInput)} className="comment__item-box__details-reply">
                                    <img src={Reply} alt="reply" />
                                    Reply
                                </button> : null}
                            </>
                        }
                    </div>
                </div>

                {currentUser && showEdit ?
                    <CommentInput value={comment.content} reload={hideInput} comment={comment} />
                    : <p className="comment__item-box__comment">
                        {comment.content}
                    </p>}
            </div>
        </div>
        {!currentUser && showInput ?
            <CommentInput reload={hideInput} comment={comment} />
            : null}

        {showDelete ?
            <div className="comment__item-delete__dialog">
                <div className="comment__item-delete__dialog-box">
                    <h2>Delete comment</h2>
                    <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    <div className="comment__item-delete__dialog-box__buttons">
                        <button onClick={() => setShowDelete(false)} className="comment__item-delete__dialog-box__buttons-no">No, Cancel</button>
                        <button onClick={deleteComment} className="comment__item-delete__dialog-box__buttons-yes">Yes, Delete</button>
                    </div>
                </div>
            </div> : null
        }
    </div>

}

export default Comment
