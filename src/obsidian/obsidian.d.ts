import { Command, TFile, View, WorkspaceLeaf } from "obsidian";

declare module 'obsidian' {
  interface App {
    commands: Commands;
  }

  interface Workspace {
    // - View type can be found in html search for `data-type`
    getLeavesOfType(viewType: 'file-explorer'): FileExplorerLeaf[] | null;
    getLeavesOfType(viewType: 'markdown'): WorkspaceLeaf[] | null;
    getLeavesOfType(viewType: 'tag'): TagPaneLeaf[] | null;
  }

  interface FileManager {
    trashFile(file: TFile): Promise<void>;
  }

  interface TFile {
    path: string;
    children?: TFile[]
  }

}

interface Commands {
  commands: Command[];

  executeCommandById(commandId: string): boolean;
}

// - File explorer
interface FileExplorerLeaf extends WorkspaceLeaf {
  view: FileExplorerView;
}

interface FileExplorerView extends View {
  activeDom: DomChild | null;
  selectedDoms: DomChild[];
  fileItems: Record<string, FileExplorerItem>;

  startRenameFile(file: TFile): Promise<void>;
}

interface DomChild {
  file: TFile;
}

interface FileExplorerItem {
  file: TFile;

  setCollapsed?: (collapsed: boolean) => void;
}

// - Tag pane
interface TagPaneLeaf extends WorkspaceLeaf {
  view: TagPaneView;
}

export interface TagPaneView extends View {
  tagDoms: Record<string, TagExplorerItem>;
}

export interface TagExplorerItem {
  setCollapsed: (collapsed: boolean) => void;
}