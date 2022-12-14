import { Notice } from "obsidian";
import { Settings } from "src/interfaces/settings";
import { FileExplorerProPlugin } from "src/main";
import { ObsidianUtils } from "src/obsidian/obsidian-utils";

export class DeleteSelectedFilesManager {
  commandId = 'delete-selected-files';
  commandName = 'Delete Selected Files in File Explorer';

  constructor(private plugin: FileExplorerProPlugin) {

  }

  init(settings: Settings) {
    if (!settings.enableDeleteSelectedFiles) return;

    this.registerCommand();
  }

  private registerCommand() {
    this.plugin.addCommand({
      id: this.commandId,
      name: this.commandName,
      hotkeys: [{ modifiers: ["Alt"], key: "delete" }],
      callback: () => this.deleteSelectedFiles()
    });
  }

  private async deleteSelectedFiles() {
    // - Get the file explorer
    const fileExplorer = ObsidianUtils.getFileExplorer(this.plugin);
    if (!fileExplorer) {
      console.error('File explorer not found');
      return;
    }

    // - Get selected items
    const files = fileExplorer.view.selectedDoms.map(x => x.file);

    // - Delete file by calling obsidian api
    for (const file of files) {
      try {
        await this.plugin.app.fileManager.trashFile(file);
      } catch (error) {
        const message = 'Failed to delete file';
        console.error({ message, file, error });
        new Notice(message);
      }
    }
  }
}