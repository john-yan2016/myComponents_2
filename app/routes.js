import * as React from 'react';
import {
    Route,
    IndexRoute,
} from 'react-router';

import Frame from './frame';

export default (
    <Route>
        <Route path="/" component={Frame} />
    </Route>


);
