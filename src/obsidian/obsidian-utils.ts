import { Plugin, TFile } from "obsidian";
import { HtmlSelector } from "./obsidian-constants";

function isFolder(file: TFile) {
  return !!file.children;
}

function getFileExplorer(plugin: Plugin) {
  return plugin.app.workspace.getLeavesOfType('file-explorer')?.first();
}

function getMarkdown(plugin: Plugin) {
  return plugin.app.workspace.getLeavesOfType('markdown')?.first();
}

function getTagPane(plugin: Plugin) {
  return plugin.app.workspace.getLeavesOfType('tag')?.first();
}

function getFileExplorerNavButtonsContainer(plugin: Plugin) {
  return getFileExplorer(plugin)?.view.containerEl.querySelector(HtmlSelector.NavButtonsContainer);
}

function getTagPaneNavButtonsContainer(plugin: Plugin) {
  return getTagPane(plugin)?.view.containerEl.querySelector(HtmlSelector.NavButtonsContainer);
}

function getViewActionsContainer(plugin: Plugin) {
  return getMarkdown(plugin)?.view.containerEl.querySelector(HtmlSelector.ViewActionsContainer);
}

function getActiveFile(plugin: Plugin) {
  return plugin.app.workspace.getActiveFile();
}


export const ObsidianUtils = {
  isFolder,
  getFileExplorer,
  getMarkdown,
  getFileExplorerNavButtonsContainer,
  getTagPaneNavButtonsContainer,
  getViewActionsContainer,
  getActiveFile,
  getTagPane,
};