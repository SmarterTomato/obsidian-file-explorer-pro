import { Plugin } from 'obsidian';
import { CollapseExpandAllManager } from './features/collapse-expand-all/collapse-expand-all.manager';
import { DeleteSelectedFilesManager } from './features/delete-selected-files/delete-selected-files.manager';
import { RevealActiveFileManager } from './features/reveal-active-file/reveal-active-file.manager';
import { SmarterFileRenameManager } from './features/smarter-file-rename/smarter-file-rename.manager';
import { UpdateFirstHeaderManager } from './features/update-first-header/update-first-header.manager';
import { Settings } from './interfaces/settings';
import { SettingTab } from './settings/setting-tab';


const DEFAULT_SETTINGS: Settings = {
	showFileExplorerRevealButton: true,
	showViewActionsRevealButton: true,
	enableDeleteSelectedFiles: true,
	addUpdateFirstHeaderCommand: true,
	autoUpdateFirstHeader: true,
	ignoreTimestamp: true,
	enableSmarterFileRename: true,
	showCollapseAndExpandAllInFileExplorer: true,
	showCollapseAndExpandAllInTagPane: true,
};

export class FileExplorerProPlugin extends Plugin {
	settings: Settings;

	revealActiveFileManager: RevealActiveFileManager;
	deleteSelectedFilesManager: DeleteSelectedFilesManager;
	updateFirstHeaderManager: UpdateFirstHeaderManager;
	smarterFileRenameManager: SmarterFileRenameManager;
	collapseExpandAllManager: CollapseExpandAllManager;

	async onload() {
		await this.loadSettings();

		this.revealActiveFileManager = new RevealActiveFileManager(this);
		this.deleteSelectedFilesManager = new DeleteSelectedFilesManager(this);
		this.updateFirstHeaderManager = new UpdateFirstHeaderManager(this);
		this.smarterFileRenameManager = new SmarterFileRenameManager(this);
		this.collapseExpandAllManager = new CollapseExpandAllManager(this);

		this.app.workspace.onLayoutReady(() => {
			// - Show collapse and expand all button
			this.collapseExpandAllManager.init(this.settings);
		});

		this.app.workspace.on('layout-change', () => {
			// - Add reveal file button to file explorer
			this.revealActiveFileManager.showFileExplorerRevealButton(this.settings.showFileExplorerRevealButton);

			// - Show reveal file button to view actions only if some file is opened
			this.revealActiveFileManager.showViewActionsRevealButton(this.settings.showViewActionsRevealButton);
		});

		// - Add delete selected items command
		this.deleteSelectedFilesManager.init(this.settings);

		// - Auto rename file header
		this.updateFirstHeaderManager.init(this.settings);

		// - Smarter rename file
		this.smarterFileRenameManager.init(this.settings);

		// - Add obsidian setting page
		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {
		this.revealActiveFileManager.unload();
		this.collapseExpandAllManager.unload();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

export default FileExplorerProPlugin;