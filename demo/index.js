import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { render } from 'react-dom';
import App from './App';
import {
  Simple, ShowUser, LinkStyle, ClickEvent, Multiple,
  Separator, Position, ImageTrigger, TextTrigger, IconTrigger, FadeIn
} from './examples/Index';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/simple" component={Simple} />
    <Route path="/showuser" component={ShowUser} />
    <Route path="/linkstyle" component={LinkStyle} />
    <Route path="/clickevent" component={ClickEvent} />
    <Route path="/separator" component={Separator} />
    <Route path="/position" component={Position} />
    <Route path="/imagetrigger" component={ImageTrigger} />
    <Route path="/texttrigger" component={TextTrigger} />
    <Route path="/icontrigger" component={IconTrigger} />
    <Route path="/fadein" component={FadeIn} />
    <Route path="/multiple" component={Multiple} />
  </Router>
), document.getElementById('app'))
