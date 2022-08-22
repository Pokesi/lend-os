/**
 * @class ReactConsole
 */
import React, { CSSProperties } from 'react';
declare type CommandsProp = {
    [command: string]: {
        description?: string;
        fn: (...args: any[]) => Promise<any>;
    };
};
export declare type ReactConsoleProps = {
    commands: CommandsProp;
    noCommandFound: (...str: string[]) => Promise<string>;
    autoFocus: boolean;
    prompt: string;
    welcomeMessage?: string | undefined;
    wrapperClassName?: string;
    promptWrapperClassName?: string;
    promptClassName?: string;
    lineClassName?: string;
    inputClassName?: string;
    wrapperStyle: CSSProperties;
    promptWrapperStyle: CSSProperties;
    promptStyle: CSSProperties;
    lineStyle: CSSProperties;
    inputStyle: CSSProperties;
    history?: string[];
    onAddHistoryItem?: (entry: string) => void;
    onSanitizeOutputLine?: (line: string) => string;
};
declare type ReactConsoleState = {
    output: string[];
    commandInProgress: boolean;
    input: string;
    historyPosition: number;
    reverseSearchString?: string;
    reverseSearchPosition: number;
};
export default class ReactConsole extends React.Component<ReactConsoleProps, ReactConsoleState> {
    inputRef: any;
    wrapperRef: any;
    reverseStringRef: any;
    static defaultProps: {
        prompt: string;
        autoFocus: boolean;
        noCommandFound: (cmd: string) => Promise<string>;
        wrapperStyle: {};
        promptWrapperStyle: {};
        promptStyle: {};
        lineStyle: {};
        inputStyle: {};
    };
    state: {
        input: string;
        output: never[];
        commandInProgress: boolean;
        reverseSearchString: undefined;
        historyPosition: number;
        reverseSearchPosition: number;
    };
    componentDidMount(): void;
    clear: () => void;
    scrollToBottom: () => void;
    /**
     * Get filtered history entries based on reverse search string
     */
    private getReverseHistory;
    /**
     * Takes current text of a main input and generates a string that will be outputted as a log.
     */
    private getCurrentTextSnapshot;
    private onSubmit;
    render(): JSX.Element;
    /**
     * Reverse search input handler
     * @param event
     */
    private onReverseStringInputChange;
    /**
     * Invoked when pressed ctrl+r and already in a reverse search mode.
     */
    private nextReverseSearch;
    /**
     * Helper function that sets the history preview based on a requested history index.
     * @param historyIndex
     */
    private executeNextReverseSearch;
    /**
     * This function sets a given history entry as a main input element content.
     * It's called when changing the preview of a 'current' history entry e.g. by ctrl+r call, or
     * when pressing up/down arrow.
     * @param historyPosition
     */
    private setPreviewPosition;
    /**
     * Enables reverse search.
     * The side effect is that we focus o reverse search input.
     */
    private onReverseSearch;
    /**
     * When reverse search is confirmed, we disable reverse search mode and keep the result.
     * @param e
     */
    private onReverseSearchSubmit;
    /**
     * Main input change handler.
     * @param event
     */
    private onInputChange;
    /**
     * Helper function to determine whether reverse search is active or not.
     */
    private isReverseSearchOn;
    /**
     * Disables reverse search mode.
     * @param keepPreviewString - determines whether the result of a reverse search should be kept or not
     */
    private disableReverseSearch;
    /**
     * onKeyDown implementation of a reverse search input.
     * @param event
     */
    private onReverseKeyDown;
    /**
     * onKeyDown implementation of a main input.
     * @param event
     */
    private onKeyDown;
    /**
     * Focuses console input.
     * Whenever an user clicks on a terminal, we want to focus an actual input where he/she can type.
     */
    focusConsole: () => void;
    /**
     * Calls onAddHistoryItem property and sets historyPosition to a default value.
     * @param inputString
     */
    private addHistoryEntry;
}
export {};
