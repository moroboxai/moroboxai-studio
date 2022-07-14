import { action } from 'typesafe-actions';
import { IFile } from '../components/generic/FileTreeItem';

export enum Constants {
    FILE_SELECTED = 'FILE_SELECTED',
}

export function selectFile(file: IFile) {
    return action(Constants.FILE_SELECTED, {file});
}
