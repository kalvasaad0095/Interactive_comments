import './CommentInput.css'
import Profile from '../../images/avatars/image-juliusomo.png'

import React, { useContext, useState } from 'react'
import { DataContext } from '../../provider'

const CommentInput = ({ comment, reload, value }) => {
    console.log('Building CommentInput')
    console.log(comment)
    const [comments, setComments] = useContext(DataContext);
    const [text, setText] = useState(value ?? '');

    function handleForm(event) {
        event.preventDefault();

        if (text.trim().length === 0) {
            alert('Cannot post empty comment');
            return;
        }

        let index = 0;
        if (comment === undefined) {
            index = comments.comments.length + 1;
            // console.log(index)
            // console.log(index)
        } else {
            // console.log('ok')
            // console.log(index)
            let mainComments = comments.comments.filter(item => comment.content === item.content);
            if (mainComments.length > 0) {
                if (mainComments[0].replies)
                    try {
                        index = mainComments[0].replies[mainComments[0].replies.length - 1].id + 1;
                    } catch (e) {
                        index = 1;
                    }
            } else {
                // alert('error')
            }

        }

        let new_comment = {
            "id": index,
            "content": text,
            "createdAt": "seconds ago",
            "score": 0,
            "user": {
                "image": {
                    "png": comments.currentUser.image.png,
                    "webp": comments.currentUser.image.webp,
                },
                "username": comments.currentUser.username
            },
            "replies": []
        };
        console.log(new_comment)
        if (value) {
            setComments(prevComments => {
                console.log(prevComments)
                let original = prevComments.comments.filter(item => comment.content === item.content);
                if (original.length > 0) {
                    original.content = text
                } else {

                    for (let i = 0; i < prevComments.comments.length; i++) {
                        let commentItem = prevComments.comments[i];
                        for (let j = 0; j < commentItem.replies.length; j++) {
                            let replyItem = commentItem.replies[j];
                            if (replyItem.content === comment.content) {
                                prevComments.comments[i].replies[j].content = text
                                break;
                            }
                        }
                    }
                }
                return prevComments;

            })

        } else {

            setComments(prevComments => {
                if (comment === undefined) {
                    prevComments.comments.push(new_comment)
                    let obj = {
                        'currentUser': prevComments.currentUser,
                        'comments': prevComments.comments
                    }
                    return obj;
                } else {
                    let original = prevComments.comments.filter(item => comment.content === item.content)[0];
                    console.log(original)
                    if (original.replies === undefined) {
                        original.replies = [new_comment]
                    } else {
                        original.replies.push(new_comment)
                    }
                    return prevComments;
                    // return prevComments;
                }
            })

        }
        if (comment !== undefined)
            reload();
        setText('')
    }
    return <form style={value ? {
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto',
        alignItems: 'flex-end',
        paddingInline: 'unset'
    }: null} onSubmit={handleForm} className="input">
        {value ?
            null :
            <img src={Profile} alt="profile" className="input__image" />
        }
        <textarea style={value ? {
            width: '100%',
        } : null} type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="input__field"
            placeholder='Add a comment...'
            name="comment" />
        <button className="input__button">{value ? 'update' : 'send'}</button>
    </form>
}

export default CommentInput
