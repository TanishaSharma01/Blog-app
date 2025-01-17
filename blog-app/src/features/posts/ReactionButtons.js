import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";
import React from 'react'

//Reaction buttons
const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    insightful: '🚀',
    clap: '👏'
}

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })
    return <div>{reactionButtons}</div>
}

export default ReactionButtons
