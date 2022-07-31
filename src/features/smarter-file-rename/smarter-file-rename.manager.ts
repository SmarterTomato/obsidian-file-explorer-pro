import { Notice } from "obsidian";
import { Settings } from "src/interfaces/settings";
import { FileExplorerProPlugin } from "src/main";
import { CommandIds, ViewType } from "src/obsidian/obsidian-constants";
import { ObsidianUtils } from "src/obsidian/obsidian-utils";

export class SmarterFileRenameManager {
  commandId = 'smarter-file-rename';
  commandName = 'Smarter File Rename';

  constructor(private plugin: FileExplorerProPlugin) {

  }

  init(settings: Settings) {
    if (!settings.enableSmarterFileRename) return;

    this.plugin.addCommand({
      id: this.commandId,
      name: this.commandName,
      hotkeys: [{ modifiers: ['Alt'], key: "F2" }],
      checkCallback: (checking) => {
        const activeLeaf = this.plugin.app.workspace.activeLeaf;
        if (!activeLeaf) return false;

        const viewType = activeLeaf.view.getViewType();
        if (checking) {
          return viewType === ViewType.FileExplorer || viewType === ViewType.Markdown;
        }

        if (viewType === ViewType.FileExplorer) {
          this.renameFile();
        }
        else if (viewType === ViewType.Markdown) {
          this.editFileTitle();
        }
      }
    });
  }

  editFileTitle() {
    this.plugin.app.commands.executeCommandById(CommandIds.Workspace.EditFileTitle);
  }

  private async renameFile() {
    const fileExplorer = ObsidianUtils.getFileExplorer(this.plugin);
    if (!fileExplorer) {
      console.error('File explorer not found');
      return;
    }

    const activeDom = fileExplorer.view.activeDom;
    if (!activeDom) {
      new Notice('Please select the file to rename in file explorer');
      return;
    }

    const file = activeDom.file;
    try {
      await fileExplorer.view.startRenameFile(file);
    } catch (error) {
      const message = 'Failed to start rename';
      console.error({ message, file, error });
      new Notice(message);
    }
  }
}