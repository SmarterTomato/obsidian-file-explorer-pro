import { App, PluginSettingTab, Setting } from 'obsidian';
import { FileExplorerProPlugin } from '../main';

export class SettingTab extends PluginSettingTab {
  plugin: FileExplorerProPlugin;

  constructor(app: App, plugin: FileExplorerProPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.createEl('h2', { text: 'File Explorer Pro Settings' });

    containerEl.createEl('h3', { text: 'Reveal Active File' });

    new Setting(containerEl)
      .setName('Show Reveal Active File Button in File Explorer')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showFileExplorerRevealButton)
        .onChange(async (value) => {
          this.plugin.settings.showFileExplorerRevealButton = value;
          this.plugin.revealActiveFileManager.showFileExplorerRevealButton(value);
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Show Reveal Active File Button in View Actions')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showFileExplorerRevealButton)
        .onChange(async (value) => {
          this.plugin.settings.showViewActionsRevealButton = value;
          this.plugin.revealActiveFileManager.showViewActionsRevealButton(value);
          await this.plugin.saveSettings();
        }));

    containerEl.createEl('h3', { text: 'Delete Selected Files' });

    new Setting(containerEl)
      .setName('Enable Delete Selected Files')
      .setDesc(
        'Requires restart obsidian. ' +
        'Add a command to delete selected files in file explorer. ' +
        'Default hotkey is "Alt+Delete". ')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableDeleteSelectedFiles)
        .onChange(async (value) => {
          this.plugin.settings.enableDeleteSelectedFiles = value;
          await this.plugin.saveSettings();
        }));

    containerEl.createEl('h3', { text: 'Auto File Header' });

    new Setting(containerEl)
      .setName('Add Update First File Header Command')
      .setDesc(
        'Requires restart obsidian. ' +
        'Add a command to automatically update first header to the current file name. ')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.addUpdateFirstHeaderCommand)
        .onChange(async (value) => {
          this.plugin.settings.addUpdateFirstHeaderCommand = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Auto Update First File Header')
      .setDesc(
        'Requires restart obsidian. ' +
        'Automatically run the command to update first header when file rename. ')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoUpdateFirstHeader)
        .onChange(async (value) => {
          this.plugin.settings.autoUpdateFirstHeader = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Ignore Timestamp in File Name')
      .setDesc(
        'First header will ignore the timestamp in the file name. ' +
        'E.g. Remove random number or timestamp at the beginning of the file name')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.ignoreTimestamp)
        .onChange(async (value) => {
          this.plugin.settings.ignoreTimestamp = value;
          await this.plugin.saveSettings();
        }));
  }
}
