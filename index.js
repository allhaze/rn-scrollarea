import React, { Component } from 'react';
import ReactNative, { requireNativeComponent, View, UIManager, StyleSheet, Platform } from 'react-native';
import ScrollResponder from 'react-native/Libraries/Components/ScrollResponder';
import createReactClass from 'create-react-class';

const NativeScrollView = requireNativeComponent('DirectedScrollView');
const NativeScrollViewChild = requireNativeComponent('DirectedScrollViewChild');

const ScrollArea = createReactClass({
    mixins: [ScrollResponder.Mixin],
    getInitialState: function() {
        return this.scrollResponderMixinGetInitialState();
    },
    setNativeProps: function(props) {
        this._scrollViewRef && this._scrollViewRef.setNativeProps(props);
    },
    getScrollResponder: function() {
        return this;
    },
    getScrollableNode: function() {
        return ReactNative.findNodeHandle(this._scrollViewRef);
    },
    scrollTo: function({ x, y, animated }) {
        UIManager.dispatchViewManagerCommand(
            this.getScrollableNode(),
            UIManager.getViewManagerConfig('DirectedScrollView').Commands.scrollTo,
            [x || 0, y || 0, animated !== false],
        );
    },
    zoomToStart: function({ animated }) {
        UIManager.dispatchViewManagerCommand(
            this.getScrollableNode(),
            UIManager.getViewManagerConfig('DirectedScrollView').Commands.zoomToStart,
            [animated !== false],
        );
    },
    updateContentOffsetIfNeeded: function() {
        setTimeout(() => {
            Platform.OS === 'ios' && UIManager.dispatchViewManagerCommand(
                this.getScrollableNode(),
                UIManager.getViewManagerConfig('DirectedScrollView').Commands.updateContentOffsetIfNeeded,
                [],
            );
        }, 0);
    },
    _scrollViewRef: null,
    _setScrollViewRef: function(ref) {
        this._scrollViewRef = ref;
    },
    componentDidMount: function() {
        this.updateContentOffsetIfNeeded();
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (this.props.contentContainerStyle != prevProps.contentContainerStyle) {
            this.updateContentOffsetIfNeeded();
        }
    },
    render: function() {
        return (
            <NativeScrollView
                {...this.props}
                ref={this._setScrollViewRef}
                onScrollBeginDrag={this.scrollResponderHandleScrollBeginDrag}
                onScrollEndDrag={this.scrollResponderHandleScrollEndDrag}
                onScroll={this.scrollResponderHandleScroll}
                onMomentumScrollBegin={this.scrollResponderHandleMomentumScrollBegin}
                onMomentumScrollEnd={this.scrollResponderHandleMomentumScrollEnd}
                onStartShouldSetResponder={this.scrollResponderHandleStartShouldSetResponderCapture}
                onScrollShouldSetResponder={this.scrollResponderHandleScrollShouldSetResponder}
                onResponderGrant={this.scrollResponderHandleResponderGrant}
                onResponderTerminationRequest={this.scrollResponderHandleTerminationRequest}
                onResponderTerminate={this.scrollResponderHandleTerminate}
                onResponderRelease={this.scrollResponderHandleResponderRelease}
                onResponderReject={this.scrollResponderHandleResponderReject}
            >
                <View style={this.props.contentContainerStyle} pointerEvents={'box-none'}>
                    {this.props.children}
                </View>
            </NativeScrollView>
        );
    }
});

export default ScrollArea;

export const ScrollAreaChild = createReactClass({
    render: function() {
        return (
            <NativeScrollViewChild {...this.props}>
                {this.props.children}
            </NativeScrollViewChild>
        );
    }
});

export const scrollViewWillBeginDragging = 'scrollViewWillBeginDragging';

export const scrollViewDidEndDragging = 'scrollViewDidEndDragging';
