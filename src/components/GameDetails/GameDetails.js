import { useEffect, useState, useReducer } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { storyServiceFactory } from '../../services/storyService';
import * as commentService from '../../services/commentService';
import { useService } from '../../hooks/useService';
import { useAuthContext } from '../../contexts/AuthContext';

import { AddComment } from './AddComment/AddComment';
import { gameReducer } from '../../reducers/gameReducer';

export const GameDetails = ({
    onStoryDelete
    }) => {
    const { storyId } = useParams();
    const { userId, isAuthenticated, userEmail } = useAuthContext();
    const [story, dispatch] = useReducer(gameReducer, {});
    const storyService = useService(storyServiceFactory)
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            storyService.getOne(storyId),
            commentService.getAll(storyId),
        ]).then(([gameData, comments]) => {
            const gameState = {
                ...gameData,
                comments,
            };
            
            dispatch({type: 'GAME_FETCH', payload: gameState})
        });
    }, [storyId]);

    const onCommentSubmit = async (values) => {
        const response = await commentService.create(storyId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            userEmail,
        });
    };

    const isOwner = story._ownerId === userId;

    const onDeleteClick = async () => {
        return onStoryDelete(story);
    };

    return (
        <section id="game-details">

            <div className="info-section">
                <h1>{story.title}</h1>

                <p className="story-body">{story.story}</p>
                {

                    isOwner && (
                        <div className="buttons">
                            <Link to={`/catalog/${story._id}/edit`} className="button">Edit</Link>
                            <button className="button" onClick={onDeleteClick}>Delete</button>
                        </div>
                    )

                /* <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments && game.comments.map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.author.email}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {!game.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${game._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )} */
                
                }
            </div>
{/* 
            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />} */}
        </section>
    );
};