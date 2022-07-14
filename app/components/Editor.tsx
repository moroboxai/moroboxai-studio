import React from 'react'
import Workspace from './Workspace';
import Player from './Player';
import CodeEditor from 'moroboxai-editor-react';

import {
	ReflexContainer,
	ReflexSplitter,
	ReflexElement
} from 'react-reflex'

type EditorProps = {
	cwd: string;
};

class Editor extends React.Component<EditorProps> {
	static propTypes: any;
	private _refWorkspace: React.RefObject<Workspace>;

	constructor(props) {
		super(props);

		this._refWorkspace = React.createRef<Workspace>();
	}

	render() {
		return (
			<ReflexContainer orientation="vertical" className="ms-editor">
				<ReflexElement className="ms-fh" flex={0.2}>
					<Workspace ref={this._refWorkspace} directory={this.props.cwd}/>
				</ReflexElement>

				<ReflexSplitter />

				<ReflexElement className="ms-fh">
					<ReflexContainer orientation="horizontal">
						<ReflexElement className="ms-fh">
							<ReflexContainer orientation="vertical">
								<ReflexElement className="ms-fh ms-fg1"></ReflexElement>

								<ReflexSplitter />

								<ReflexElement>
									<Player id="ms-player" url="https://raw.githubusercontent.com/moroboxai/moroboxai-games/master/games/pong/header.yml" />
								</ReflexElement>

								<ReflexSplitter />

								<ReflexElement className="ms-fh ms-fg1"></ReflexElement>
							</ReflexContainer>
						</ReflexElement>

						<ReflexSplitter />

						<ReflexElement className="ms-fh ms-fg1">
							<CodeEditor />
						</ReflexElement>
					</ReflexContainer>
				</ReflexElement>
			</ReflexContainer>
		)
	}
}

Editor.propTypes = {};

export default Editor;