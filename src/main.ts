import { Plugin } from 'obsidian';
import { Settings } from './interfaces/settings';
import { RevealActiveFileManager } from './features/reveal-active-file/file-explorer-manager';
import { HtmlSelector, ViewType } from './obsidian/obsidian-constants';
import { SettingTab } from './settings/setting-tab';


const DEFAULT_SETTINGS: Settings = {
	showFileExplorerRevealButton: true,
	showViewActionsRevealButton: true
};

export default class FileExplorerProPlugin extends Plugin {
	settings: Settings;

	revealActiveFileManager: RevealActiveFileManager;

	async onload() {
		await this.loadSettings();

		// - Add button to file explorer
		this.revealActiveFileManager = new RevealActiveFileManager(this);
		this.app.workspace.onLayoutReady(() => {
			this.revealActiveFileManager.init();
		});

		// - Add obsidian setting page
		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {

	}

	getFileExplorer() {
		return this.app.workspace.getLeavesOfType(ViewType.FileExplorer).first();
	}

	getMarkdown() {
		return this.app.workspace.getLeavesOfType(ViewType.Markdown).first();
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


