define('objects/objects',["require", "exports"], function (require, exports) {
    "use strict";
    var Story = (function () {
        function Story() {
        }
        return Story;
    }());
    exports.Story = Story;
    var Page = (function () {
        function Page() {
        }
        return Page;
    }());
    exports.Page = Page;
    var Placeholder = (function () {
        function Placeholder() {
        }
        return Placeholder;
    }());
    exports.Placeholder = Placeholder;
    var Cover = (function () {
        function Cover() {
        }
        return Cover;
    }());
    exports.Cover = Cover;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('api',["require", "exports", 'aurelia-framework', 'aurelia-fetch-client'], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1) {
    "use strict";
    var latency = 200;
    var id = 0;
    var Api = (function () {
        function Api(http) {
            this.http = http;
            this.isRequesting = false;
            http
                .configure(function (config) {
                config
                    .withBaseUrl('http://localhost:3000/')
                    .withDefaults({
                    credentials: 'omit',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                });
            });
            this.http = http;
        }
        Api.prototype.search = function (searchText) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var results = games;
                    var mapHeaders = function (x) {
                        return {
                            title: x.title,
                            description: x.description,
                            slug: x.slug,
                            tags: x.tags,
                            authors: x.authors,
                            editors: x.editors,
                            pageCount: x.pageCount,
                            pageStats: x.pageStat
                        };
                    };
                    var q = !!searchText ? "/?q=" + searchText : '';
                    _this.http.fetch("b/browse" + q)
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        var results = data.map(function (x) { return mapHeaders(x); });
                        resolve(results);
                    });
                    _this.isRequesting = false;
                }, latency);
            });
        };
        Api.prototype.getStory = function (storySlug) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    _this.http.fetch("s/" + storySlug + "/all")
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        resolve(data);
                    });
                }, latency);
            });
        };
        Api.prototype.getPage = function (gameFolderName, pageNumber) {
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var page = game[pageNumber];
                    resolve(page);
                }, latency);
            });
        };
        Api.prototype.GetPage = function (game, page) {
        };
        Api = __decorate([
            aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient), 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient])
        ], Api);
        return Api;
    }());
    exports.Api = Api;
    var games = [{
            folder: 'sample-game-for-example',
            title: 'Sample Game',
            description: 'This is a sample game',
            pages: 4,
            genres: ['demo', 'test']
        }];
    var game = {
        state: {
            dog_name: ''
        },
        1: {
            text: 'This is the text for page 1',
            image: '5-mysterious-columns.jpg',
            input: ['dog_name', 'Enter a name for your dog'],
            buttons: [['Continue', '2'], ['Continue Alt', '3']]
        },
        2: {
            text: 'This is the text for page 2 and his name was ${dog_name}',
            image: '2-fleeting-abstract.jpg',
            buttons: [['Back', '1'], ['Continue', '3']]
        },
        3: {
            text: 'This is the text for page 3',
            image: '4-historic-scene.jpg',
            buttons: [['Back to start', '1'], ['Continue', '4']]
        },
        4: {
            text: 'This is the text for page 4, Is this the end?',
            image: '3-alien-bug.jpg',
            buttons: [['Continue', 5]]
        },
        5: {
            text: 'You have found the wall painting. The treasure is yours.',
            image: '1-wall-painting.jpg',
            buttons: []
        }
    };
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1) {
    "use strict";
    var App = (function () {
        function App(eventAggregator) {
            this.eventAggregator = eventAggregator;
            this.message = 'Choose Your Own Adventure';
            this.subscribe();
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'Aurelia';
            config.map([
                { route: ['', 'browse'], title: 'Browse Games', name: 'browse', moduleId: './pages/browse', nav: true },
                { route: 'play/:slug/:page?', name: 'play',
                    moduleId: './pages/play', activationStrategy: 'replace',
                }
            ]);
        };
        App.prototype.goToHome = function () {
            this.router.navigateToRoute('browse');
        };
        App.prototype.subscribe = function () {
            var _this = this;
            this.eventAggregator.subscribe('SelectStory', function (story) {
                _this.selectedStory = story;
            });
        };
        App = __decorate([
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [aurelia_event_aggregator_1.EventAggregator])
        ], App);
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('interpolator',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var Interpolator = (function () {
        function Interpolator() {
        }
        Interpolator.prototype.activate = function (model) {
            this.template = model.template;
            Object.assign(this, model.state);
        };
        Interpolator.prototype.getViewStrategy = function () {
            var view = "<template> " + this.template + " </template>";
            return new aurelia_framework_1.InlineViewStrategy(view);
        };
        return Interpolator;
    }());
    exports.Interpolator = Interpolator;
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('state',["require", "exports"], function (require, exports) {
    "use strict";
    var State = (function () {
        function State() {
            this.storyData = {};
        }
        return State;
    }());
    exports.State = State;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources('./elements/browse-card.html');
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/browse',["require", "exports", 'aurelia-router', './../api', 'aurelia-framework', 'aurelia-event-aggregator'], function (require, exports, aurelia_router_1, api_1, aurelia_framework_1, aurelia_event_aggregator_1) {
    "use strict";
    var Browse = (function () {
        function Browse(router, api, eventAggregator) {
            this.router = router;
            this.api = api;
            this.eventAggregator = eventAggregator;
            this.eventAggregator.publish("SelectStory", null);
        }
        Browse.prototype.activate = function () {
            var _this = this;
            return this.api.search('').then(function (res) { return _this.covers = res; });
        };
        Browse.prototype.goToGame = function (cover) {
            this.router.navigateToRoute('play', { slug: cover.slug });
            this.eventAggregator.publish("SelectStory", cover);
        };
        Browse = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router, api_1.Api, aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [aurelia_router_1.Router, api_1.Api, aurelia_event_aggregator_1.EventAggregator])
        ], Browse);
        return Browse;
    }());
    exports.Browse = Browse;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/play',["require", "exports", 'aurelia-router', './../api', 'aurelia-framework', './../state', 'aurelia-event-aggregator'], function (require, exports, aurelia_router_1, api_1, aurelia_framework_1, state_1, aurelia_event_aggregator_1) {
    "use strict";
    var Play = (function () {
        function Play(router, api, state, eventAggregator) {
            this.router = router;
            this.api = api;
            this.state = state;
            this.eventAggregator = eventAggregator;
            this.isPageChanging = false;
        }
        Play.prototype.canActivate = function (params) {
            var _this = this;
            if (this.state.story == null ||
                this.state.story.slug != params.slug) {
                var p = new Promise(function (resolve, reject) {
                    return _this.api
                        .getStory(params.slug)
                        .then(function (res) {
                        if (res.pages == null) {
                            resolve(false);
                            alert('The story has no pages');
                            _this.router.navigateToRoute('browse');
                        }
                        else {
                            _this.state.story = res;
                            resolve(true);
                        }
                    }).catch(function (err) { return alert('Unable to load story! ' + err); });
                });
                return p;
            }
        };
        Play.prototype.activate = function (params) {
            var page = 1;
            if (params.page == null) {
                params.page = 1;
            }
            page = params.page;
            this.setPageData(page);
            this.eventAggregator.publish("SelectStory", this.story.cover);
        };
        Play.prototype.setPageData = function (pageNum) {
            try {
                var page = this.state.story.pages[pageNum];
                this.text = page.text;
                this.image = page.image;
                this.buttons = page.buttons;
                this.input = page.input;
                this.story = this.state.story;
                this.setImagePath();
            }
            catch (ex) {
                alert("Unable to find page " + pageNum);
            }
        };
        Play.prototype.goToPage = function (pageNum) {
            if (this.input && !this.inputVal) {
                alert("Please enter required input");
                return;
            }
            this.isPageChanging = true;
            var slug = this.state.story.slug;
            this.router.navigateToRoute('play', { slug: slug, page: pageNum });
        };
        Play.prototype.setImagePath = function () {
            if (this.image.indexOf("www.") > -1) {
                this.imagePath = this.image;
            }
            else if (this.image) {
                this.imagePath = 'images/' + this.image;
            }
            else {
                this.imagePath = null;
            }
        };
        Play.prototype.canDeactivate = function () {
            if (this.isPageChanging)
                return true;
            return confirm('Are you sure you want to exit?');
        };
        Object.defineProperty(Play.prototype, "inputVal", {
            get: function () {
                if (!this.state.storyData[this.input[0]])
                    return null;
                return this.state.storyData[this.input[0]];
            },
            set: function (value) {
                console.log("Set: " + value);
                this.state.storyData[this.input[0]] = value;
            },
            enumerable: true,
            configurable: true
        });
        Play = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router, api_1.Api, state_1.State, aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [aurelia_router_1.Router, api_1.Api, state_1.State, aurelia_event_aggregator_1.EventAggregator])
        ], Play);
        return Play;
    }());
    exports.Play = Play;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <h1 class=\"clickable\" click.trigger=\"goToHome()\">App Home</h2>\n\n  <h2>${message}</h1>\n\n\n  <router-view></router-view>\n\n\n  <require from=\"app.css\"></require>\n\n  <br />\n  <div if.bind=\"!!selectedStory\" class=\"unfocus\">\n    <browse-card cover.one-way=\"selectedStory\"></browse-card>\n  </div>\n\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "body { font-family:\"Open Sans\", sans-serif; color:#333; }\n\n.soft{   color:#aaa; }\n.big{  font-size:1.3em;}\n.small{  font-size:.8em;}\n.tiny{  font-size:.5em; line-height: 1.1em; }\n\ntag { margin:.2em .5em; }\n.flush-left{ margin-left:0;}\n\n.clickable{  cursor:pointer; }\n\n/* browse */\n.browse-card, .game-card{\n  border:1px solid #aaa;\n  border-top:none;\n  padding:.5em 1em;  \n  box-shadow:0px 0px 2px lightgray;\n  max-width: 500px;\n}\n\n.browse-card{\n    line-height: 1.6em;\n}\n\n@media screen and ( min-width:600px ){ .browse-card, .game-card { margin-bottom:1em; } }\n\n.img-container{\n  background-color:whitesmoke;\n  width:100%;\n  text-align: center;\n  line-height: 0;\n  padding:1em 0;\n  border-radius: 1em;\n\n}\nimg{\n  max-width:100%;\n  max-height:250px;\n}\n/* game */\n.game-card{\n  line-height: 1.5em;\n}\n\n.unfocus{ opacity:.7; border:none; filter: blur(1px); }\n.unfocus:hover, .unfocus:focus{ opacity:1; filter:none; }\n\n"; });
define('text!pages/browse.html', ['module'], function(module) { module.exports = "<template>\n  \n  <h3> What Game will You Play Next? </h3>\n \n  <div repeat.for=\"g of covers\" \n    click.trigger=\"goToGame(g)\"\n    class=\"clickable\">\n\n    <browse-card cover.one-way=\"g\"></browse-card>\n\n  </div>\n\n</template>\n"; });
define('text!pages/play.html', ['module'], function(module) { module.exports = "<template>\n\n<div class=\"game-card\">\n  \n  \n  <p id=\"text\" if.bind=\"text\">\n    <compose view-model=\"./../interpolator\"\n              model.bind=\"{ state : state.storyData , template : text }\">\n    </compose>\n  </p>\n\n\n  <div class=\"img-container\" if.bind =\"imagePath\">\n    <img src.bind=\"imagePath\" />\n  </div>\n  \n  <form>\n  \n  <div if.bind=\"input.length > 0\">\n    <!-- variable name is input[0] -->\n    <input id=\"input\" type=\"text\" value.bind=\"inputVal\"\n     placeholder.bind=\"input[1]\"/>\n  </div>\n  \n  <div id=\"buttonBox\">\n\n    <button repeat.for=\"b of buttons\" click.trigger=\"goToPage(b[1])\" type=\"submit\">\n      ${b[0]}\n    </button>\n\n  </div>\n  </form>\n\n</div>\n\n</template>\n"; });
define('text!resources/elements/browse-card.html', ['module'], function(module) { module.exports = "   \r\n<template bindable=\"cover\">\r\n    <div class=\"browse-card\">\r\n        <line class=\"big\">${cover.title}</line>\r\n        <div  class=\"small\">\r\n        ${cover.description}\r\n        <div class=\"soft\">\r\n        ${cover.pageCount} Pages\r\n\r\n        <tag repeat.for=\"tag of g.tags\">\r\n            ${cover.tag}        \r\n        </tag>\r\n        </div>\r\n\r\n        </div>\r\n\r\n        <line class=\"tiny\">\r\n        <tag class=\"flush-left\">${cover.slug}</tag> \r\n        <tag class=\"flush-left\">${cover.authors}</tag> \r\n        </line>\r\n        \r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map