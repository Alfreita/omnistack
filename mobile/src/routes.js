import {
    createSwitchNavigator,
    createAppContainer,
    createStackNavigator
} from "react-navigation";

import Login from './pages/login';
import Timeline from './pages/timeLine';
import New from './pages/New';

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