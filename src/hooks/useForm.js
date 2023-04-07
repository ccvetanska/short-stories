import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);
    const { userEmail } = useContext(AuthContext);
    
    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);

        setValues({...initialValues, ownerName: userEmail});
    };

    const changeValues = (newValues) => {
        // TODO: Validate newValues shape (like initialValues)

        setValues({...newValues, ownerName: userEmail});
    };

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
    };
};