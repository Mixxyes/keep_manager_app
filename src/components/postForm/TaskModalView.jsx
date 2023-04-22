import {useSelector, useDispatch} from 'react-redux';
import {setPostFormData} from '../../store/actions';

import CustomInput from '../UI/input/CustomInput';
import CustomSelect from '../UI/customSelect/CustomSelect';


function TaskModalView() {
    const {taskFields} = useSelector(state => state.postFormState);
    const dispatch = useDispatch();
    const {title, description, deadline, priority} = taskFields;
    
    
    const options = [
        {value: 'high', label: 'High'},
        {value: 'low', label: 'Low'},
    ];

    return (
        <>
            <CustomInput 
                id="taskTitle"
                required 
                type="text" 
                placeholder="New task's title" 
                name="taskTitle" 
                value={title}
                onChange={(e) => dispatch(setPostFormData({
                        taskFields: {
                            ...taskFields, 
                            title: e.target.value
                        } 
                    }))
                }
            />

            <CustomInput 
                id='taskDescription'
                required 
                type="text" 
                placeholder="Description" 
                name="taskDescription" 
                value={description}
                onChange={(e) => dispatch(setPostFormData({
                    taskFields: {
                        ...taskFields, 
                        description: e.target.value
                    } 
                }))}
            />

            <div className="label_wrapper">
                <label>
                    Inter deadline
                    <CustomInput 
                        required 
                        type="date" 
                        name="deadline" 
                        value={deadline}
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        onChange={(e) => dispatch(setPostFormData({
                            taskFields: {
                                ...taskFields, 
                                deadline: e.target.value
                            } 
                        }))}
                    />
                </label>
            </div>

            <CustomSelect
                
                value={priority ? options.find(item => item.value === priority) : null}
                placeholder="Priority"
                isSearchable={false}
                isClearable
                onChange={selectedOption => dispatch(setPostFormData({
                    taskFields: {
                        ...taskFields, 
                        priority: selectedOption ? selectedOption.value : null,
                    } 
                }))}
                options={options}
            />
        </>
    );
}

export default TaskModalView;