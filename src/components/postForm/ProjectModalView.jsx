import {useSelector, useDispatch} from 'react-redux';
import {setPostFormData} from '../../store/actions';

import CustomInput from '../UI/input/CustomInput';

function ProjectModalView() {
    const {projectFields} = useSelector(state => state.postFormState);
    const dispatch = useDispatch();
    return (
        <>
            <CustomInput 
                required 
                type="text" 
                placeholder="New project's name" 
                name="title" 
                
                value={projectFields.title}
                onChange={(e) => dispatch(setPostFormData({
                    projectFields: {
                        ...projectFields, 
                        title: e.target.value
                    } 
                }))}
            />
            <CustomInput 
                required 
                type="text" 
                placeholder="New project's description" 
                name="description" 
                
                value={projectFields.description}
                onChange={(e) => dispatch(setPostFormData({
                    projectFields: {
                        ...projectFields, 
                        description: e.target.value
                    } 
                }))}
            />
        </>
    );
}

export default ProjectModalView;