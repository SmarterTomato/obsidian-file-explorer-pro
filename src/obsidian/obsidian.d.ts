import { View, WorkspaceLeaf } from "obsidian";

declare module 'obsidian' {
  interface App {
    commands: Commands;
  }

  interface Workspace {
    getLeavesOfType(viewType: 'search' | 'file-explorer' | 'markdown'): ExplorerLeaf[];
  }
}

interface ExplorerLeaf extends WorkspaceLeaf {
  view: View;
}

interface Commands {
  commands: [];

  executeCommandById(commandId: string): boolean;
}