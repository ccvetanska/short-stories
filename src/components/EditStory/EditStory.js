import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { storyServiceFactory } from "../../services/storyService";
import { AuthContext } from '../../contexts/AuthContext';

export const EditStory = ({
    onStoryEditSubmit,
}) => {
    const { storyId } = useParams();
    const storyService = useService(storyServiceFactory);
    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        title: '',
        genre: '',
        story: '',
        description: ''
    }, onStoryEditSubmit);

    useEffect(() => {
        storyService.getOne(storyId)
            .then(result => {
                changeValues(result);
            });
    }, [storyId]);

    return (
        <section id="edit-page" className="auth">
            <form id="edit" method="post" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Edit your story...</h1>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                    />
                    <br></br>
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={values.genre}
                        onChange={changeHandler}
                    />
                    <br></br>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={changeHandler}
                    />
                    <br></br>
                    <label htmlFor="story">Story:</label>
                    <textarea name="story" id="story" value={values.story} onChange={changeHandler}></textarea>
                    <input className="btn submit" type="submit" value="Edit Story" />
                </div>
            </form>
        </section>
    );
};