import './style/css/style.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./components/Home";
import MainPage from "./components/MainPage";
import IndividualCard from "./components/IndividualCard";
import CheckConnection from "./utils/CheckConnection";
import Connection from "./components/Connection";

function App() {

    const connection = CheckConnection();
    console.log(connection);


    if(connection) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/questions' component={MainPage}/>
                    <Route path='/questions/:id' component={IndividualCard}/>
                </Switch>
            </BrowserRouter>
        )
    } else {
        return (
            <Connection/>
        )
    }

}

export default App;
