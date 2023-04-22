
import {useSelector, useDispatch} from 'react-redux';
import {setFilter} from '../../store/actions';

import CustomSelect from '../UI/customSelect/CustomSelect';
import CustomInput from '../UI/input/CustomInput';

import './filter.scss';

function PostFilter() {

    const filter = useSelector(state => state.filter);
    const type = useSelector(state => state.postFormState.type);
    const dispatch = useDispatch();
    
    const isClearBtnShow = Boolean(filter.sort) || Boolean(filter.query) || Boolean(filter.deadline);

    const options = [
        {value: 'title', label: 'by title'},
        {value: 'description', label: 'by description'},
    ]

    if (type === 'task') options.push({value: 'deadline', label: 'by deadline'});

    return (
        
        <div className='controls'>


            <div className='search_sort'>
                <CustomInput
                    value={filter.query}
                    placeholder='Search by title'
                    onChange={e=>dispatch(setFilter({...filter, query: e.target.value}))}
                />

                <CustomSelect
                    onChange={selectedSort => dispatch(setFilter({...filter, sort: selectedSort ? selectedSort.value : null}))}
                    options={options}
                    isSearchable={false}
                    isClearable
                    placeholder='Sorting...'
                    value={filter.sort ? options.find(item => item.value === filter.sort) : null}
                    
                />
            </div>

                <div className="filter">
                    
                    {(type === 'task') ?
                        <div className='filter_deadline'>
                            <label htmlFor='deadline'>
                                toDo before..
                            </label>
                            <CustomInput
                                value={filter.deadline}
                                id='deadline'
                                type="date"
                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                onChange={e=>dispatch(setFilter({...filter, deadline: e.target.value}))}
                            />

                        </div>
                        :
                        null
                    }
                    {
                        isClearBtnShow ? 
                            <button 
                                className='btn btn_filter' 
                                style={{marginLeft: 'auto'}} 
                                onClick={() => dispatch(setFilter({sort: null, query: '', deadline: ''}))}>
                                    Clear Filter
                            </button>
                            :
                            null
                    }
                </div>



        </div>

    );
}

export default PostFilter;