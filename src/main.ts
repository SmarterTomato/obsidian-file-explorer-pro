import { Plugin } from 'obsidian';
import { Settings } from './interfaces/settings';
import { SettingTab } from './settings/setting-tab';


const DEFAULT_SETTINGS: Settings = {
	showExplorerRevealButton: true
};

export default class FileExplorerProPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();

		// - Add obsidian setting page
		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


