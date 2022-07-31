import { Settings } from "src/interfaces/settings";
import { FileExplorerProPlugin } from "src/main";
import { ObsidianUtils } from "src/obsidian/obsidian-utils";
import { ElementFactory } from "src/utils/element-factory";
import { Icons } from "src/utils/icons";

export class CollapseExpandAllManager {
  expandIcon = Icons.SquarePlus;
  expandTooltips = 'Expand All';
  collapseIcon = Icons.SquareMinus;
  collapseTooltips = 'Collapse All';

  expandButtonFileExplorer: HTMLElement | undefined;
  collapseButtonFileExplorer: HTMLElement | undefined;
  expandButtonTagPane: HTMLElement | undefined;
  collapseButtonTagPane: HTMLElement | undefined;


  constructor(private plugin: FileExplorerProPlugin) {

  }

  init(settings: Settings) {
    this.initFileExplorer(settings.showCollapseAndExpandAllInFileExplorer);
    this.initTagPane(settings.showCollapseAndExpandAllInTagPane);
  }

  initFileExplorer(show: boolean) {
    this.expandButtonFileExplorer = this.addFileExplorerButton(show, this.expandButtonFileExplorer, this.expandIcon, this.expandTooltips, this.expandFileItems);
    this.collapseButtonFileExplorer = this.addFileExplorerButton(show, this.collapseButtonFileExplorer, this.collapseIcon, this.collapseTooltips, this.collapseFileItems);
  }

  initTagPane(show: boolean) {
    this.expandButtonTagPane = this.addTagPaneButton(show, this.expandButtonTagPane, this.expandIcon, this.expandTooltips, this.expandTagsItems);
    this.collapseButtonTagPane = this.addTagPaneButton(show, this.collapseButtonTagPane, this.collapseIcon, this.collapseTooltips, this.collapseTagsItems);
  }

  unload() {
    this.expandButtonFileExplorer?.remove();
    this.collapseButtonFileExplorer?.remove();
    this.expandButtonTagPane?.remove();
    this.collapseButtonTagPane?.remove();
  }

  private addTagPaneButton(
    show: boolean,
    existingButton: HTMLElement | undefined,
    icon: string,
    tooltips: string,
    callback: () => void
  ) {
    // > User want to hide button, but button exists. We need to remove it
    if (!show && existingButton) {
      existingButton.remove();
      return undefined;
    }
    // > User want to user button and button already exists. Nothing to do
    else if (show && existingButton) {
      return existingButton;
    }
    // > User want to hide the button, and button not exists. Nothing to do
    else if (!show && !existingButton) {
      return undefined;
    }

    // - Get nav container in the tag pane
    const container = ObsidianUtils.getTagPaneNavButtonsContainer(this.plugin);
    if (!container) {
      // This technically should not happen
      console.error('File Explorer not found');
      return;
    }

    // - Create button
    const button = ElementFactory.createNavActionButton(icon);
    button.setAttribute('aria-label', tooltips);
    this.plugin.registerDomEvent(button, 'click', callback.bind(this));
    container.appendChild(button);
    return button;
  }

  private addFileExplorerButton(
    show: boolean,
    existingButton: HTMLElement | undefined,
    icon: string,
    tooltips: string,
    callback: () => void
  ) {
    // > User want to hide button, but button exists. We need to remove it
    if (!show && existingButton) {
      existingButton.remove();
      return undefined;
    }
    // > User want to user button and button already exists. Nothing to do
    else if (show && existingButton) {
      return existingButton;
    }
    // > User want to hide the button, and button not exists. Nothing to do
    else if (!show && !existingButton) {
      return undefined;
    }

    // - Get nav container in the file explorer
    const container = ObsidianUtils.getFileExplorerNavButtonsContainer(this.plugin);
    if (!container) {
      // This technically should not happen
      console.error('File Explorer not found');
      return;
    }

    // - Create button
    const button = ElementFactory.createNavActionButton(icon);
    button.setAttribute('aria-label', tooltips);
    this.plugin.registerDomEvent(button, 'click', callback.bind(this));
    container.appendChild(button);
    return button;
  }

  private expandFileItems() {
    this.setFileItemsCollapsed(false);
  }

  private collapseFileItems() {
    this.setFileItemsCollapsed(true);
  }

  private setFileItemsCollapsed(collapsed: boolean) {
    // - Get the file explorer
    const fileExplorer = ObsidianUtils.getFileExplorer(this.plugin);
    if (!fileExplorer) {
      console.error('File explorer not found');
      return;
    }

    const files = Object.entries(fileExplorer.view.fileItems);
    for (const [path, fileItem] of files) {
      // - Ignore obsidian root
      if (path === '/') continue;

      // - Collapse all folder item
      const isFolder = ObsidianUtils.isFolder(fileItem.file);
      if (isFolder && fileItem.setCollapsed) {
        fileItem.setCollapsed(collapsed);
      }
    }
  }

  private expandTagsItems() {
    this.setTagsItemsCollapsed(false);
  }

  private collapseTagsItems() {
    this.setTagsItemsCollapsed(true);
  }

  private setTagsItemsCollapsed(collapsed: boolean) {
    // - Get the file explorer
    const tagPane = ObsidianUtils.getTagPane(this.plugin);
    if (!tagPane) {
      console.error('Tag pane not found');
      return;
    }

    const tags = Object.entries(tagPane.view.tagDoms);
    for (const [, tagItem] of tags) {
      // - Collapse all folder item
      tagItem.setCollapsed(collapsed);
    }
  }
}