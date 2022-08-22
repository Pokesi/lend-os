import React from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* add css styles here (optional) */\n\n.styles_wrapper__3KXDn {\n  display: flex;\n  flex-direction: column;\n  background-color: black;\n  color: white;\n  font-family: monospace;\n  font-size: 12px;\n  padding: 10px;\n  height: 300px;\n}\n\n.styles_promptWrapper__2Cy1Y {\n  display: flex;\n}\n\n.styles_line__1lhnu {\n  font-size: 12px;\n  line-height: 12px;\n  font-family: monospace;\n  background: transparent !important; /* we want to make this transparent whatever happens in the app*/\n  padding: 0;\n  color: white;\n}\n\n.styles_prompt__1nRph {\n  display: flex;\n  align-items: center;\n}\n\n.styles_input__15JGo {\n  flex: 1;\n  background: transparent !important; /* we want to make this transparent whatever happens in the app*/\n  border: none;\n  outline: none;\n  color: white;\n  font-family: monospace;\n  font-size: 13px;\n}\n";
var styles = {"wrapper":"styles_wrapper__3KXDn","promptWrapper":"styles_promptWrapper__2Cy1Y","line":"styles_line__1lhnu","prompt":"styles_prompt__1nRph","input":"styles_input__15JGo"};
styleInject(css);

/**
 * @class ReactConsole
 */
// @ts-ignore
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var ReactConsole = /** @class */ (function (_super) {
    __extends(ReactConsole, _super);
    function ReactConsole() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputRef = null;
        _this.wrapperRef = null;
        _this.reverseStringRef = null;
        _this.state = {
            input: '',
            output: [],
            commandInProgress: false,
            reverseSearchString: undefined,
            historyPosition: Infinity,
            reverseSearchPosition: Infinity,
        };
        _this.clear = function () {
            _this.setState({ output: [], input: '' });
        };
        _this.scrollToBottom = function () {
            setTimeout(function () {
                _this.wrapperRef.scrollTop = _this.wrapperRef.scrollHeight;
            });
        };
        /**
         * Get filtered history entries based on reverse search string
         */
        _this.getReverseHistory = function () {
            var reverseSearchString = _this.state.reverseSearchString;
            return _this.props.history === undefined ?
                []
                : _this.props.history.map(function (entry) { return (reverseSearchString === undefined || reverseSearchString === '') ?
                    // @ts-ignore
                    false : entry.indexOf(reverseSearchString) !== -1; });
        };
        /**
         * Takes current text of a main input and generates a string that will be outputted as a log.
         */
        _this.getCurrentTextSnapshot = function () {
            var prompt = _this.props.prompt;
            var inputString = _this.state.input;
            return prompt + "\u00A0" + inputString;
        };
        _this.onSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var inputString, log, _a, cmd, args, command, ret, cmdNotFound;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        e.preventDefault();
                        inputString = this.state.input;
                        if (inputString === null) {
                            return [2 /*return*/];
                        }
                        log = this.getCurrentTextSnapshot();
                        if (inputString === '') {
                            this.setState({
                                output: __spreadArrays(this.state.output, [log]),
                                input: '',
                            });
                            this.scrollToBottom();
                            return [2 /*return*/];
                        }
                        this.addHistoryEntry(inputString);
                        _a = inputString.split(" "), cmd = _a[0], args = _a.slice(1);
                        if (cmd === 'clear') {
                            this.clear();
                            return [2 /*return*/];
                        }
                        command = this.props.commands[cmd];
                        this.setState({ commandInProgress: true });
                        if (!command) return [3 /*break*/, 2];
                        return [4 /*yield*/, command.fn.apply(command, args)];
                    case 1:
                        ret = _c.sent();
                        this.setState({
                            output: __spreadArrays(this.state.output, [log, ret])
                        });
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (_b = this.props).noCommandFound.apply(_b, __spreadArrays([cmd], args))];
                    case 3:
                        cmdNotFound = _c.sent();
                        this.setState({
                            output: __spreadArrays(this.state.output, [log, cmdNotFound])
                        });
                        _c.label = 4;
                    case 4:
                        this.setState({ commandInProgress: false, input: '' });
                        this.inputRef.focus();
                        this.scrollToBottom();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Reverse search input handler
         * @param event
         */
        _this.onReverseStringInputChange = function (event) {
            _this.setState({
                reverseSearchString: event.target.value,
            }, function () {
                var history = _this.getReverseHistory();
                var historyIndex = history.lastIndexOf(true);
                _this.executeNextReverseSearch(historyIndex);
            });
        };
        /**
         * Invoked when pressed ctrl+r and already in a reverse search mode.
         */
        _this.nextReverseSearch = function () {
            var history = _this.getReverseHistory();
            var endOffset = Math.max(0, _this.state.reverseSearchPosition - 1); // so that we don't go from the end again
            var historyIndex = history.lastIndexOf(true, endOffset);
            _this.executeNextReverseSearch(historyIndex);
        };
        /**
         * Helper function that sets the history preview based on a requested history index.
         * @param historyIndex
         */
        _this.executeNextReverseSearch = function (historyIndex) {
            _this.setState({
                reverseSearchPosition: historyIndex,
            });
            if (historyIndex !== -1) {
                _this.setPreviewPosition(historyIndex);
            }
            if (_this.state.reverseSearchString === '') {
                _this.setPreviewPosition(Infinity);
            }
        };
        /**
         * This function sets a given history entry as a main input element content.
         * It's called when changing the preview of a 'current' history entry e.g. by ctrl+r call, or
         * when pressing up/down arrow.
         * @param historyPosition
         */
        _this.setPreviewPosition = function (historyPosition) {
            if (_this.props.history === undefined) {
                return;
            }
            _this.setState({
                historyPosition: historyPosition,
                input: _this.props.history[historyPosition] || '',
            });
        };
        /**
         * Enables reverse search.
         * The side effect is that we focus o reverse search input.
         */
        _this.onReverseSearch = function () {
            // we enabled reverse search
            _this.setState({
                reverseSearchString: '',
            }, function () {
                _this.reverseStringRef.focus();
            });
        };
        /**
         * When reverse search is confirmed, we disable reverse search mode and keep the result.
         * @param e
         */
        _this.onReverseSearchSubmit = function (event) {
            event.preventDefault();
            _this.disableReverseSearch();
        };
        /**
         * Main input change handler.
         * @param event
         */
        _this.onInputChange = function (event) {
            _this.setState({
                input: event.target.value,
            });
        };
        /**
         * Helper function to determine whether reverse search is active or not.
         */
        _this.isReverseSearchOn = function () { return _this.state.reverseSearchString !== undefined; };
        /**
         * Disables reverse search mode.
         * @param keepPreviewString - determines whether the result of a reverse search should be kept or not
         */
        _this.disableReverseSearch = function (keepPreviewString) {
            if (keepPreviewString === void 0) { keepPreviewString = true; }
            _this.setState({
                reverseSearchString: undefined,
            });
            if (!keepPreviewString) {
                _this.setState({
                    input: '',
                });
            }
            setTimeout(function () {
                _this.inputRef.focus();
            });
        };
        /**
         * onKeyDown implementation of a reverse search input.
         * @param event
         */
        _this.onReverseKeyDown = function (event) {
            if (event.which === 38 || event.which === 40) { // up or down
                _this.disableReverseSearch();
                event.preventDefault();
            }
            else if (event.which === 67 && event.ctrlKey) { // ctrl + c
                _this.disableReverseSearch(false);
                event.preventDefault();
            }
            else if (event.which === 82 && event.ctrlKey) { // ctrl + r
                _this.nextReverseSearch();
                event.preventDefault();
            }
        };
        /**
         * onKeyDown implementation of a main input.
         * @param event
         */
        _this.onKeyDown = function (event) {
            if (event.which === 38) { // key up
                if (_this.props.history === undefined) {
                    return;
                }
                var currentPos = Math.min(_this.state.historyPosition, _this.props.history.length);
                var historyPosition = Math.max(0, currentPos - 1);
                _this.setPreviewPosition(historyPosition);
                event.preventDefault();
            }
            else if (event.which === 40) {
                if (_this.props.history === undefined) {
                    return;
                }
                var historyPosition = Math.min(_this.props.history.length, _this.state.historyPosition + 1);
                _this.setPreviewPosition(historyPosition);
                event.preventDefault();
            }
            else if (event.which === 82 && event.ctrlKey) { // ctrl + r
                if (_this.props.history === undefined) {
                    return;
                }
                _this.onReverseSearch();
                event.preventDefault();
            }
            else if (event.which === 67 && event.ctrlKey) { // ctrl + c
                _this.setState({
                    output: __spreadArrays(_this.state.output, [_this.getCurrentTextSnapshot()]),
                    input: '',
                });
                _this.scrollToBottom();
                event.preventDefault();
            }
        };
        /**
         * Focuses console input.
         * Whenever an user clicks on a terminal, we want to focus an actual input where he/she can type.
         */
        _this.focusConsole = function () {
            if (_this.inputRef) {
                if (document.getSelection().isCollapsed) {
                    _this.inputRef.focus();
                }
            }
        };
        /**
         * Calls onAddHistoryItem property and sets historyPosition to a default value.
         * @param inputString
         */
        _this.addHistoryEntry = function (inputString) {
            var onAddHistoryItem = _this.props.onAddHistoryItem;
            if (typeof onAddHistoryItem === 'function') {
                onAddHistoryItem(inputString);
            }
            _this.setState({
                historyPosition: Infinity,
            });
        };
        return _this;
    }
    ReactConsole.prototype.componentDidMount = function () {
        var welcomeMessage = this.props.welcomeMessage;
        if (welcomeMessage) {
            this.setState({
                output: [welcomeMessage],
            });
        }
        if (this.props.history !== undefined) {
            this.setState({
                historyPosition: this.props.history.length,
            });
        }
    };
    ReactConsole.prototype.render = function () {
        var _this = this;
        var _a = this.props, wrapperClassName = _a.wrapperClassName, promptWrapperClassName = _a.promptWrapperClassName, promptClassName = _a.promptClassName, lineClassName = _a.lineClassName, inputClassName = _a.inputClassName, wrapperStyle = _a.wrapperStyle, promptWrapperStyle = _a.promptWrapperStyle, promptStyle = _a.promptStyle, lineStyle = _a.lineStyle, inputStyle = _a.inputStyle, prompt = _a.prompt, autoFocus = _a.autoFocus;
        var sanitizeOutputLine = function (line) {
            var onSanitizeOutputLine = _this.props.onSanitizeOutputLine;
            if (typeof onSanitizeOutputLine === 'function') {
                return onSanitizeOutputLine(line);
            }
            return line;
        };
        return (React.createElement("div", { className: classnames(styles.wrapper, wrapperClassName), style: __assign({ overflowY: isIE11 ? "scroll" : "auto" }, wrapperStyle), onClick: this.focusConsole, ref: function (ref) { return _this.wrapperRef = ref; } },
            React.createElement("div", null, this.state.output
                .map(function (line) { return sanitizeOutputLine(line); })
                .map(function (line, key) {
                return React.createElement("pre", { key: key, className: classnames(styles.line, lineClassName), style: lineStyle, dangerouslySetInnerHTML: { __html: line } });
            })),
            React.createElement("form", { onSubmit: this.onSubmit },
                React.createElement("div", { className: classnames(styles.promptWrapper, promptWrapperClassName), style: promptWrapperStyle },
                    React.createElement("span", { className: classnames(styles.prompt, promptClassName), style: promptStyle },
                        prompt,
                        "\u00A0"),
                    React.createElement("input", { disabled: this.state.commandInProgress || this.isReverseSearchOn(), ref: function (ref) { return _this.inputRef = ref; }, autoFocus: autoFocus, value: this.state.input, onChange: this.onInputChange, onKeyDown: this.onKeyDown, autoComplete: 'off', spellCheck: false, autoCapitalize: 'false', name: "input", className: classnames([styles.input, inputClassName]), style: inputStyle }))),
            this.isReverseSearchOn() && React.createElement("form", { onSubmit: this.onReverseSearchSubmit },
                "bck-i-search: ",
                React.createElement("input", { value: this.state.reverseSearchString, ref: function (ref) { return _this.reverseStringRef = ref; }, onKeyDown: this.onReverseKeyDown, className: classnames([styles.input, inputClassName]), onChange: this.onReverseStringInputChange }))));
    };
    ReactConsole.defaultProps = {
        prompt: '$',
        autoFocus: false,
        noCommandFound: function (cmd) { return Promise.resolve("Command " + cmd + " does not exist"); },
        wrapperStyle: {},
        promptWrapperStyle: {},
        promptStyle: {},
        lineStyle: {},
        inputStyle: {},
    };
    return ReactConsole;
}(React.Component));

export default ReactConsole;
//# sourceMappingURL=index.es.js.map
