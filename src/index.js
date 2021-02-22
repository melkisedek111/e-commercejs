import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { AlertProvider } from "./context/alert";


ReactDOM.render(<AlertProvider><App /></AlertProvider>, document.getElementById('root'));