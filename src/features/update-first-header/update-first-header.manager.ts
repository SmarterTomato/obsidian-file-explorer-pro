import { Notice, TFile, TFolder } from "obsidian";
import { Settings } from "src/interfaces/settings";
import { FileExplorerProPlugin } from "src/main";

export class UpdateFirstHeaderManager {
  commandId = 'update-first-header';
  commandName = 'Update First Header to File Name';

  constructor(private plugin: FileExplorerProPlugin) {

  }

  init(settings: Settings) {
    // - Add update file header command
    this.registerCommand(settings);

    // - Listen to file rename event
    this.autoRename(settings);
  }

  private registerCommand(settings: Settings) {
    if (!settings.addUpdateFirstHeaderCommand) return;

    this.plugin.addCommand({
      id: this.commandId,
      name: this.commandName,
      hotkeys: [{ modifiers: ["Alt"], key: "h" }],
      checkCallback: (checking) => {
        if (checking) {
          return !!this.plugin.getActiveFile();
        }

        this.renameThisFileFirstHeader();
      }
    });
  }

  private autoRename(settings: Settings) {
    if (!settings.autoUpdateFirstHeader) return;

    this.plugin.registerEvent(
      this.plugin.app.vault.on('rename', this.renameHeader.bind(this))
    );
  }

  private renameThisFileFirstHeader() {
    this.renameHeader(this.plugin.getActiveFile());
  }

  private async renameHeader(file: TFile | TFolder | null) {
    try {
      if (!file) return;

      // - Ignore renamed folder. Nothing to update
      const isFolder = !!((<TFolder>file).children);
      if (isFolder) return;

      // - If ignore timestamp is enabled, remove all numbers at the beginning
      let heading = file.basename;
      if (this.plugin.settings.ignoreTimestamp) {
        heading = heading.replace(/[0-9-_]*/, '');
      }

      // - Read the file as text
      let markdownContent = await this.plugin.app.vault.read(file);

      // - Replace first heading with the new heading
      markdownContent = markdownContent.replace(/#\s.*/, `# ${heading}`);

      // - Write back to the file
      await this.plugin.app.vault.modify(file, markdownContent);
    } catch (error) {
      console.error({ message: 'Failed to rename header', file, error });
      new Notice('Failed to rename header');
    }
  }
}