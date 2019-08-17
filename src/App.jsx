import { Switch, Route, withRouter } from 'react-router-dom';
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';
import HomeComponent from './components/HomeComponent';
import SideNavigation from './components/SideNavigation';
import NotificationComponent from './components/NotificationComponent'
import React from "react";

@withRouter
class App extends React.Component {
    render() {
        return (
            <div>
                <SideNavigation>
                    <NotificationComponent>
                        <Switch>
                            <Route exact path='/page1' component={FirstComponent} />
                            <Route exact path='/page2' component={SecondComponent} />
                            <Route component={HomeComponent} />
                        </Switch>
                    </NotificationComponent>
                </SideNavigation>
            </div>
        );
    }
}

export default App;
