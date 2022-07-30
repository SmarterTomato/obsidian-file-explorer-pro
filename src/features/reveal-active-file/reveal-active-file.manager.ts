import { FileExplorerProPlugin } from "src/main";
import { CommandIds } from "src/obsidian/obsidian-constants";
import { ElementFactory } from "src/utils/element-factory";
import { Icons } from "src/utils/icons";

export class RevealActiveFileManager {
  private revealActiveFileIcon = Icons.MyLocation;
  private revealActiveFileTooltips = 'Reveal Active File In Navigation';

  private fileExplorerRevealButton: HTMLElement | undefined;
  private viewActionsRevealButton: HTMLElement | undefined;

  constructor(private plugin: FileExplorerProPlugin) { }

  showFileExplorerRevealButton(show: boolean) {
    // - This happens when user change the settings, we need to remove the existing button
    // > User want to hide button, but button exists. We need to remove it
    if (!show && this.fileExplorerRevealButton) {
      this.fileExplorerRevealButton.remove();
      this.fileExplorerRevealButton = undefined;
      return;
    }
    // > User want to user button and button already exists
    else if (show && this.fileExplorerRevealButton) {
      return;
    }
    // > User want to hide the button, and button not exists. Nothing to do
    else if (!show) {
      return;
    }

    // - Get nav container in the file explorer
    const container = this.plugin.getNavButtonsContainer();
    if (!container) {
      // This technically should not happen
      console.error('File Explorer not found');
      return;
    }

    // - Create button
    const button = ElementFactory.createNavActionButton(this.revealActiveFileIcon);
    button.setAttribute('aria-label', this.revealActiveFileTooltips);

    this.plugin.registerDomEvent(button, 'click', this.revealActiveFile.bind(this));

    container.appendChild(button);
    this.fileExplorerRevealButton = button;
  }

  /**
   * - Show view actions only when:
   *   + Enabled in the settings
   *   + And, any file is opened
   * @param show 
   * @returns 
   */
  showViewActionsRevealButton(show: boolean) {

    const isFileOpened = !!this.plugin.getActiveFile();

    // > User want to hide button or no file is opened, but button exists. We need to remove it
    if ((!show || !isFileOpened) && this.viewActionsRevealButton) {
      this.viewActionsRevealButton.remove();
      this.viewActionsRevealButton = undefined;
      return;
    }
    else if (
      // > User want to user button and button already exists. Nothing to do
      (show && this.viewActionsRevealButton) ||
      // > User want to hide the button, and button not exists. Nothing to do
      !show ||
      // > No file opened
      !isFileOpened
    ) {
      return;
    }

    // - Get nav container in the view actions
    const container = this.plugin.getViewActionsContainer();
    if (!container) {
      // This technically should not happen
      console.error('View Actions not found');
      return;
    }

    // - Create button
    const button = ElementFactory.createViewActionButton(this.revealActiveFileIcon);
    button.setAttribute('aria-label', this.revealActiveFileTooltips);

    this.plugin.registerDomEvent(button, 'click', this.revealActiveFile.bind(this));

    container.insertBefore(button, container.firstChild);
    this.viewActionsRevealButton = button;
  }


  private revealActiveFile() {
    this.plugin.app.commands.executeCommandById(CommandIds.FileExplorer.RevealActiveFile);
  }
}