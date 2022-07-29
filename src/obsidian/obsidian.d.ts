import { Command, TFile, View, WorkspaceLeaf } from "obsidian";

declare module 'obsidian' {
  interface App {
    commands: Commands;
  }

  interface Workspace {
    // - View type can be found in html search for `data-type`
    getLeavesOfType(viewType: 'file-explorer'): FileExplorerLeaf[] | null;
    getLeavesOfType(viewType: 'markdown'): WorkspaceLeaf[] | null;
  }

  interface FileManager {
    trashFile(file: TFile): Promise<void>;
  }

  interface TFile {
    path: string;
  }

}

interface FileExplorerLeaf extends WorkspaceLeaf {
  view: FileExplorerView;
}

interface FileExplorerView extends View {
  selectedDoms: FileExplorerDom[];
}

interface FileExplorerDom {
  file: TFile;
}

interface Commands {
  commands: Command[];

  executeCommandById(commandId: string): boolean;
}