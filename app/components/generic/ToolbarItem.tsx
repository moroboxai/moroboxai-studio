import React from "react";

export interface IToolbarItem {
    label: string;
    toggled?: boolean;
    items?: IToolbarItem[];
}

type ToolbarItemProps = {
    className?: string;
    template: IToolbarItem;
    onMouseEnter?: () => void; 
    onClick?: () => void;
};

type ToolbarItemState = {};

class ToolbarItem extends React.Component<ToolbarItemProps, ToolbarItemState> {
    static propTypes: any;

    constructor(props) {
        super(props);
    }

    render() {
        const toggled = this.props.template.toggled || false;

        return (
            <a className={"ms-toolbar-item " + (this.props.className || "") + (toggled ? " ms-active" : "")} href="#" onMouseEnter={this.props.onMouseEnter} onClick={this.props.onClick}>
                {this.props.template.label}
            </a>
        )
    }
}

ToolbarItem.propTypes = {};

export default ToolbarItem;