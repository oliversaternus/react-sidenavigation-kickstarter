import { Switch, Route, withRouter } from 'react-router-dom';
import CompanySettings from './views/CompanySettings';
import AccountSettings from './views/AccountSettings';
import AppSettings from './views/AppSettings';
import React from "react";

@withRouter
class Settings extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/settings/account' component={AccountSettings} />
                    <Route exact path='/settings/company' component={CompanySettings} />
                    <Route component={AppSettings} />
                </Switch>
            </div>
        );
    }
}

export default Settings;
