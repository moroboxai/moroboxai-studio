import React from "react";
import FileTree from './FileTree';

type FileTreeRootProps = {
    className?: string;
    directory?: string;
};

type FileTreeRootState = {
    fileTree: FileTree;
};

class FileTreeRoot extends React.Component<FileTreeRootProps, FileTreeRootState> {
    static propTypes: any;

    constructor(props) {
        super(props);

        this.state = {fileTree: new FileTree(this.props.directory || '.')};
        this.state.fileTree.build();
    }
  
    render() {
        var filetree = this.state.fileTree
          ? this.state.fileTree.renderUnorderedList()
          : null;

        return (
            <div className={"ms-filetree-root " + (this.props.className || "")}>
                {filetree}
            </div>
        )
    }
}

FileTreeRoot.propTypes = {};

export default FileTreeRoot;