import {NavLink} from 'react-router-dom';

import './appHeader.scss';

function AppHeader() {

    return (
        <header>
            <div className="container">
                <div className="header_wrapper">
                    <h1>
                        <NavLink end to="/">Keep manager</NavLink>
                    </h1>
                    <nav className="app_menu">
                        <ul>
                            <li>
                                <NavLink 
                                    end 
                                    style={({isActive}) => ({color: isActive ? '#F2545B' : 'inherit'})}
                                    to="/">
                                        My projects
                                </NavLink>
                            </li>
                            /
                            <li>
                                <NavLink 
                                    end 
                                    style={({isActive}) => ({color: isActive ? '#F2545B' : 'inherit'})}
                                    to="/tasks">
                                        My tasks
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;