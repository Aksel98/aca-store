import React from "react";

export default class ErrorBoundary extends React.Component {

    componentDidCatch(error, errorInfo) {
        console.log(error)
        console.log(errorInfo)
    }

    render() {
        return this.props.children
    }
}
