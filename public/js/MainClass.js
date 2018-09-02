import Bar from './Bar.js';
import Bartender from './Bartender.js';

var $containerDiv = $("body").append("<div id='container'></div>");

const bar = new Bar();
bar.setup();

const bartender = new Bartender();
bartender.setup();
