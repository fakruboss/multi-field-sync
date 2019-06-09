import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Options extends React.Component {
    render() {
        const { values } = this.props;
        const options = values.map(value => (
            <option key={value}>{value}</option>
        ));
        return options;
    }
}
class MultiFieldSync extends React.Component {
    static availableOptions = [
        "apple",
        "orange",
        "papaya",
        "grape",
        "muskmelon"
    ];
    state = {
        commaSeparated: "",
        multiLine: "",
        multiSelect: []
    };
    handleSubmit = event => {
        event.preventDefault();
    };
    filterMultiselect = values => {
        return values.filter(v => MultiFieldSync.availableOptions.includes(v));
    };
    handleCommaSepareted = event => {
        const { value } = event.target;
        const valueSelect = value
            .split(",")
            .map(v => v.trim())
            .filter(Boolean);
        this.setState({
            commaSeparated: value,
            multiLine: valueSelect.join("\n"),
            multiSelect: this.filterMultiselect(valueSelect)
        });
    };
    handleMultiline = event => {
        const { value } = event.target;
        const valueSelect = value
            .split("\n")
            .map(v => v.trim())
            .filter(Boolean);
        this.setState({
            multiLine: value,
            commaSeparated: valueSelect.join(","),
            multiSelect: this.filterMultiselect(valueSelect)
        });
    };
    handleMultiselect = event => {
        const valueSelect = Array.from(event.target.selectedOptions).map(
            o => o.value
        );
        this.setState({
            multiSelect: valueSelect,
            commaSeparated: valueSelect.join(","),
            multiLine: valueSelect.join("\n")
        });
    };
    render() {
        const { commaSeparated, multiLine, multiSelect } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Comma Separated Values: </label>
                    <br />
                    <input
                        onChange={this.handleCommaSepareted}
                        value={commaSeparated}
                    />
                </div>
                <div>
                    <label>Multiline Values:</label>
                    <br />
                    <textarea
                        rows={MultiFieldSync.availableOptions.length}
                        value={multiLine}
                        onChange={this.handleMultiline}
                    />
                </div>
                <div>
                    <label>Multiselect Values:</label>
                    <br />
                    <select
                        onChange={this.handleMultiselect}
                        multiple
                        value={multiSelect}
                        size={MultiFieldSync.availableOptions.length}
                    >
                        <Options values={MultiFieldSync.availableOptions} />
                    </select>
                </div>
            </form>
        );
    }
}
ReactDOM.render(<MultiFieldSync />, document.getElementById("root"));
