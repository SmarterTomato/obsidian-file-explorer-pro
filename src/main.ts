import { Plugin } from 'obsidian';
import { DeleteSelectedFilesManager } from './features/delete-selected-files/delete-selected-files.manager';
import { RevealActiveFileManager } from './features/reveal-active-file/reveal-active-file.manager';
import { Settings } from './interfaces/settings';
import { HtmlSelector } from './obsidian/obsidian-constants';
import { SettingTab } from './settings/setting-tab';


const DEFAULT_SETTINGS: Settings = {
	showFileExplorerRevealButton: true,
	showViewActionsRevealButton: true,
	enableDeleteSelectedFiles: true,
};

export default class FileExplorerProPlugin extends Plugin {
	settings: Settings;

	revealActiveFileManager: RevealActiveFileManager;
	deleteSelectedFilesManager: DeleteSelectedFilesManager;

	async onload() {
		await this.loadSettings();

		// - Add reveal file button to file explorer
		this.revealActiveFileManager = new RevealActiveFileManager(this);
		this.app.workspace.onLayoutReady(() => {
			this.revealActiveFileManager.init(this.settings);
		});

		// - Add delete selected items command
		this.deleteSelectedFilesManager = new DeleteSelectedFilesManager(this);
		this.deleteSelectedFilesManager.init(this.settings);

		// - Add obsidian setting page
		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {

	}

	getFileExplorer() {
		return this.app.workspace.getLeavesOfType('file-explorer')?.first();
	}

	getMarkdown() {
		return this.app.workspace.getLeavesOfType('markdown')?.first();
	}

	getNavButtonsContainer() {
		return this.getFileExplorer()?.view.containerEl.querySelector(HtmlSelector.NavButtonsContainer);
	}

	getViewActionsContainer() {
		return this.getMarkdown()?.view.containerEl.querySelector(HtmlSelector.ViewActionsContainer);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


