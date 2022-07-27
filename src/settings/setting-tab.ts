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
      .setName('Show Explorer Reveal Button')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showExplorerRevealButton)
        .onChange(async (value) => {
          this.plugin.settings.showExplorerRevealButton = value;
          await this.plugin.saveSettings();
        }));
  }
}
