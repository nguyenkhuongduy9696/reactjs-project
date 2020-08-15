import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Routers from './routers';


function App() {
    return (
        <Routers />
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
