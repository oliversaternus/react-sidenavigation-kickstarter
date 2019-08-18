import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './views/home/Home';
import Settings from './views/settings/Settings';
import SideNavigation from './components/SideNavigation';
import NotificationComponent from './components/NotificationComponent';
import React from "react";

@withRouter
class App extends React.Component {
    render() {
        return (
            <div>
                <SideNavigation>
                    <NotificationComponent>
                        <Switch>
                            <Route path='/settings' component={Settings} />
                            <Route component={Home} />
                        </Switch>
                    </NotificationComponent>
                </SideNavigation>
            </div>
        );
    }
}

export default App;
