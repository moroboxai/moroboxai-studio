/**
 * Toolbar panel displaying the menu.
 */
import React from "react";
import ToolbarItem, {IToolbarItem} from './ToolbarItem';

export interface IToolbar {
    items: IToolbarItem[];
}

type ToolbarProps = {
    className?: string;
    template: IToolbar;
};

type ToolbarState = {
    items: IToolbarItem[];
    selectedIndex: number | null;
};

class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
    static propTypes: any;

    constructor(props) {
        super(props);

        this.state = {items: this.props.template.items, selectedIndex: null};
    }

    private _handleMouseEnter(index: number) {
        if (this.state.selectedIndex !== null) {
            this._handleClick(index);
        }
    }

    private _handleClick(index: number) {
        if (index === this.state.selectedIndex) {
            return;
        }

        const items = this.state.items;
        if (this.state.selectedIndex !== null) {
            items[this.state.selectedIndex].toggled = false;
        }
        items[index].toggled = true;
        this.setState({items, selectedIndex: index});
    }

    render() {
        return (
            <div className={"ms-toolbar " + (this.props.className || "")}>
                <ul>
                    {this.state.items.map((item, i) => {
                        const index = i;

                        return (
                            <ToolbarItem
                                template={item}
                                onMouseEnter={() => this._handleMouseEnter(index)}
                                onClick={() => this._handleClick(index)}/>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

Toolbar.propTypes = {};

export default Toolbar;