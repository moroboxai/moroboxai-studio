import React from 'react';
import { Dispatch } from "redux";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Actions } from '../../actions/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight, faFile } from '@fortawesome/free-solid-svg-icons';

export interface IFile {
    name: string;
    path: string;
    items: IFile[];
    renderUnorderedList(): JSX.Element;
    isDir: boolean;
    isFile: boolean;
}

type FileTreeItemProps = {
    className?: string;
    id: number;
    file: IFile;
    toggled?: boolean;
    selectFile: (file: IFile) => void;
};

type FileTreeItemState = {
    toggled: boolean;
};

class FileTreeItem extends React.Component<FileTreeItemProps, FileTreeItemState> {
    static propTypes: any;

    constructor(props) {
        super(props);

        this.state = {toggled: this.props.toggled || false};

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
        if (this.props.file.isDir) {
            this.setState({toggled: !this.state.toggled});
            return;
        }

        this.props.selectFile(this.props.file);
    }

    _getIcon() {
        if (this.props.file.isDir) {
            return this.state.toggled ? faAngleDown : faAngleRight;
        }

        return faFile;
    }
  
    render() {
        const {id, file, ...props} = this.props;

        return (
            <li className={"ms-filetree-item " + (this.props.className || "")} key={id}>
                <a href="#" onClick={this._handleClick}>
                    <FontAwesomeIcon className="ms-fab" icon={this._getIcon()}/>
                    {this.props.file.name}
                </a>
                {this.state.toggled && file.items && file.items.length > 0 &&
                    file.renderUnorderedList()
                }
            </li>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
    return {
        selectFile: (file: IFile) => dispatch(actions.selectFile(file))
    }
};

FileTreeItem.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FileTreeItem);