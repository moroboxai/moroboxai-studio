import React from 'react';
import * as fs from 'fs';
import FileTreeItem, {IFile} from './FileTreeItem';

export default class FileTree implements IFile {
    path: string;
    name: string;
    items: FileTree[];
    isDir: boolean;
    isFile: boolean;
    
    constructor(path, name = null){
        this.path = path;
        this.name = name;
        this.items = [];
        this.isDir = false;
        this.isFile = false;
    }

    build = () => {
        this.items = FileTree.readDir(this.path);
    }

    renderUnorderedList = () => {
        return FileTree.renderUnorderedListHtml(this.items);
    }

    static renderUnorderedListHtml(files) {
        return (
            <ul>
                {files.map((file, i) => {
                    return (
                        <FileTreeItem id={i} file={file}/>
                    )
                })}
            </ul>
        )
    }

    static readDir(path) {
        var fileArray = [];

        fs.readdirSync(path).forEach(file => {
            var fileInfo = new FileTree(`${path}\\${file}`, file);

            var stat = fs.statSync(fileInfo.path);

            if (stat.isDirectory()){
                fileInfo.items = FileTree.readDir(fileInfo.path);
                fileInfo.isDir = true;
            } else {
                fileInfo.isFile = true;
            }

            fileArray.push(fileInfo);
        })

        return fileArray;
    }
}