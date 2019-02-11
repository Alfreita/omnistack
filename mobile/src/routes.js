import {
    createSwitchNavigator,
    createAppContainer,
    createStackNavigator
} from "react-navigation";

import Login from './pages/login.js';
import Timeline from './pages/timeLine.js';
import New from './pages/New.js';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        App:createStackNavigator({
            Timeline,
            New,
        }),   
    })

);


export default Routes;