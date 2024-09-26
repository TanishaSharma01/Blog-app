import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost, deletePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    //get post by id
    const post = useSelector((state) => selectPostById(state, Number(postId)))

    //fetch title and content
    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    //post not found
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    //set and change title and content
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const canSave = [title, content].every(Boolean) && requestStatus === 'idle';

    //save post
    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, reactions: post.reactions })).unwrap()

                setTitle('')
                setContent('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    //delete post
    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2 style={{textAlign:"center"}}>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post ✅
                </button>
                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post ❌
                </button>
            </form>
        </section>
    )
}

export default EditPostForm