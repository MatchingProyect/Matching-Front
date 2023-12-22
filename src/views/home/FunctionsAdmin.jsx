import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchSports } from "../../redux/reducer";
import { useForm } from 'react-hook-form';

const FunctionsAdmin = () => {

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const endPoint = '/sports'
        const response = await axios.post(endPoint, data)
        if (response.status) {
            if (data) dispatch(fetchSports());
        }
    }
}

export default FunctionsAdmin;