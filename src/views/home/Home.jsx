import { Switch, Route, withRouter } from 'react-router-dom';
import FirstComponent from './views/FirstComponent';
import SecondComponent from './views/SecondComponent';
import Home from './views/Home';
import React from "react";

@withRouter
class Settings extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/home1' component={FirstComponent} />
                    <Route exact path='/home2' component={SecondComponent} />
                    <Route component={Home} />
                </Switch>
            </div>
        );
    }
}

export default Settings;
