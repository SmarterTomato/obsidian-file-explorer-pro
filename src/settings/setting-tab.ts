import { App, PluginSettingTab, Setting } from 'obsidian';
import FileExplorerProPlugin from '../main';

export class SettingTab extends PluginSettingTab {
  plugin: FileExplorerProPlugin;

  constructor(app: App, plugin: FileExplorerProPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'General Settings' });

    new Setting(containerEl)
      .setName('Show Reveal Active File Button in File Explorer')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showFileExplorerRevealButton)
        .onChange(async (value) => {
          this.plugin.settings.showFileExplorerRevealButton = value;
          this.plugin.revealActiveFileManager.init(this.plugin.settings);
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Show Reveal Active File Button in View Actions')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showFileExplorerRevealButton)
        .onChange(async (value) => {
          this.plugin.settings.showViewActionsRevealButton = value;
          this.plugin.revealActiveFileManager.init(this.plugin.settings);
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Enable Alt+Delete to Delete Selected Files in File Explorer')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableDeleteSelectedFiles)
        .onChange(async (value) => {
          this.plugin.settings.enableDeleteSelectedFiles = value;
          await this.plugin.saveSettings();
        }));
  }
}
