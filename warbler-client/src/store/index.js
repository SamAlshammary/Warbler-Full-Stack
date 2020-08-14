import rootReducer from "./reducers";
import {createStore, applyMiddleware, compose} from 'redux'; //compose will allows us to combine functions together, this is going to be useful for the second parameter of create store as well!. =>
                                                    //applyMiddleware will be useful to apply any middleware we want, specifically Thunk middleware from Redux!
import thunk from 'redux-thunk'; //this will allow us to delay the evaluation of some expression and its essential for working with asynchronous code in Redux.


export function configureStore(){
    const store = createStore(
            rootReducer, 
            compose(
                applyMiddleware(thunk),
                window.devToolsExtension ? window.devToolsExtension() : f => f //this is going to be useful for debugging the application in the redux dev tools
          )
                );

        return store;
}