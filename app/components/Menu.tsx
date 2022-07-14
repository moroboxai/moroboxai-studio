/**
 * Menu panel.
 */
import React from "react";
import Toolbar, { IToolbar } from "./generic/Toolbar";

type MenuProps = {};

type MenuState = {
    template: IToolbar;
};

class Menu extends React.Component<MenuProps, MenuState> {
    static propTypes: any;

    constructor(props) {
        super(props);

        this.state = {template: {
            items: [
                {
                    label: "File",
                    items: [
                        {
                            label: "Open Folder..."
                        },
                        {
                            label: "Exit"
                        }
                    ]
                },
                {
                    label: "Help",
                    items: [
                        {
                            label: "About"
                        }
                    ]
                }
            ]
        }};

        this._handleClick = this._handleClick.bind(this);
    }

    private _handleClick() {

    }

    render() {
        return (
            <div className="ms-menu-panel">
                <Toolbar template={this.state.template}/>
            </div>
        )
    }
}

Menu.propTypes = {};

export default Menu;