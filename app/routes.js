import * as React from 'react';
import {
    Route,
    IndexRoute,
} from 'react-router';

import Frame from './frame';
import Test from './components/test';

export default (
    <Route>
        <Route path="/" component={Frame} >
            <Route path="test" component={Test} />
        </Route>
    </Route>


);
