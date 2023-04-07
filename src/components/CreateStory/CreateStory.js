import { useForm } from '../../hooks/useForm';

export const CreateStory = ({
    onCreateStorySubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        genre: '',
        story: '',
        description: '',
        ownerName: ''
    }, onCreateStorySubmit);

    return (
        <section id="create-page" className="auth">
            <form id="create" method="post" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Write your new story...</h1>

                    <label htmlFor="title">Title:</label>
                    <input value={values.title} onChange={changeHandler} type="text" id="title" name="title" placeholder="Enter story title..." />
                    <br></br>
                    <label htmlFor="category">Genre:</label>
                    <input value={values.genre} onChange={changeHandler} type="text" id="genre" name="genre" placeholder="Enter story genre..." />
                    <br></br>
                    <label htmlFor="description">Description:</label>
                    <input value={values.description} onChange={changeHandler} type="text" id="description" name="description" placeholder="Exciting and in one sentence..." />
                    <br></br>
                    <label htmlFor="story">Story:</label>
                    <textarea name="story" id="story" value={values.story} onChange={changeHandler}></textarea>
                    <input className="btn submit" type="submit" value="Submit story" />
                </div>
            </form>
        </section>
    );
};
