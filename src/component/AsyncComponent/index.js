import React from "react";

class AsyncComponent extends React.PureComponent {
  state = {
    module: null
  };
  componentWillMount() {
    this.load(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }
  load(props) {
    this.setState({
      module: null
    });
    props.load().then(result => {
      const module = result.default ? result.default : result;
      if (module) {
        this.setState({
          module
        });
      }
    });
  }
  render() {
    const Module = this.state.module;
    const props = this.props;

    const propsToChild = { ...props };
    delete propsToChild["load"];

    return this.state.module ? <Module {...propsToChild} /> : null;
  }
}

export default AsyncComponent;
