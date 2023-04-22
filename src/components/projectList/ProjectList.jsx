import {useEffect} from 'react';

import storageService from '../../services/storageService';

import {useDispatch, useSelector} from 'react-redux';
import {showModal, setPostFormData, updateProjectList, setFilter} from '../../store/actions';

import { useSearch } from '../../services/hooks/useFilter';
import ProjectItem from '../postItem/ProjectItem';


import {CSSTransition, TransitionGroup} from 'react-transition-group';

import './projectList.scss';


function ProjectList() {
    const {get, set} = storageService();

    const {filter, projectList, taskList} = useSelector(state => state);
    const dispatch = useDispatch();

    if (!filter) {
        filter={sort: null, query: '', deadline: ''}
    }

    if (filter.sort === 'deadline') dispatch(setFilter({sort: null, query: '', deadline: ''}));

    useEffect(() => {

        get('projectList')
        .then(data => {
            if (data) {
                dispatch(updateProjectList(data));
            } else {
                set('projectList', projectList); 
                set('taskList', taskList);               
            } 
        })

        dispatch(setPostFormData({type: "project"}));
        dispatch(setFilter({sort: null, query: '', deadline: ''}))
    }, []);
   
    let isFilterOn = Boolean(filter.query) || Boolean(filter.deadline) || Boolean(filter.sort);
    
    const filteredAndSortedProjectList = useSearch(projectList, filter.sort, filter.query);   
    const message = isFilterOn ? 'There are no projects for this filter request' : 'There are no projects here';

    return (
        <>
            <div className="list_title"><h2>Project List</h2></div>

            {filteredAndSortedProjectList.length ?
                <TransitionGroup>
                    {filteredAndSortedProjectList.map((project, i) => {
                        return (
                            <CSSTransition key={project.id} timeout={500} classNames='project_item' className='project'>
                                <ProjectItem number={i+1} project={project}/>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            :
                <p>{message}</p>
            }

            <button className='btn' style={{marginLeft: 'auto'}} onClick={() => dispatch(showModal())}>Add Project</button>           
        </>
    );
}

export default ProjectList;