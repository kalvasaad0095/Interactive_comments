import './CommentBox.css'

import React, {useContext, useState} from 'react'
import Comment from '../Comment/Comment'
import { DataContext } from '../../provider';

const CommentBox = ({ comment, reloadApp }) => {
    // console.log('Building CommentBox', comment)
    const [comments, setComments] = useContext(DataContext);
    const [reload, setReload] = useState(false);
    function changeReload() {
        setReload(!reload)
    }

    return <>
        <div className="comment__box">
            <Comment reloadApp={reloadApp} reload={changeReload} comment={comment} />
            <div className="comment__item__reply">
                <div className="comment__item__reply-line"></div>
                {comment.replies !== null && comment.replies.length > 0 ?
                    <div className="comment__item__reply-comments">
                        {comment.replies.map((item, index) => <Comment reload={changeReload} isReply={true} comment={item} key={index} />)}
                    </div>
                    : <span></span>
                }
            </div>
        </div>
    </>
}

export default CommentBox
