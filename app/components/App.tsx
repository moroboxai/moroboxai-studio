import React from 'react'
import Editor from './Editor';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from "../reducers";

const querystring = require('querystring');

// get back command line arguments from URL query
const query = querystring.parse(global.location.search);
const options: any = JSON.parse(query['?options'] as string);

const store = createStore(reducers, {});

const App = () => {
	return (
        <Provider store={store}>
			<Editor cwd={options.cwd}/>
		</Provider>
	)
}

export default App
