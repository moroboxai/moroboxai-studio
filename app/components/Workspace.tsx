/**
 * Workspace panel displaying the file tree.
 */
import React from "react";
import FileTree from "./generic/FileTree";
import FileTreeItem, {IFile} from "./generic/FileTreeItem";
import path from 'path';

type WorkspaceProps = {
    directory: string;
};

type WorkspaceState = {
    directory: string;
    root: IFile;
};

class RootFile implements IFile {
    name: string;
    path: string;
    items: IFile[] = [undefined];
    fileTree: FileTree;
    renderUnorderedList(): JSX.Element {
        return this.fileTree.renderUnorderedList();
    }
    isDir: boolean = true;
    isFile: boolean = false;

    constructor(target: string) {
        this.name = path.basename(target);
        this.path = target;
        this.fileTree = new FileTree(target);
        this.fileTree.build();
    }
}

class Workspace extends React.Component<WorkspaceProps, WorkspaceState> {
    static propTypes: any;

    constructor(props) {
        super(props);

        this.state = {
            directory: this.props.directory,
            root: new RootFile(this.props.directory)
        }

        this._handleClick = this._handleClick.bind(this);
    }

    private _handleClick() {

    }

    render() {
        return (
            <div className="ms-workspace-panel">
                <ul className="ms-filetree-root">
                    <FileTreeItem id={0} className="ms-filetree-header" file={this.state.root} toggled={true} />
                </ul>
            </div>
        )
    }
}

Workspace.propTypes = {};

export default Workspace;