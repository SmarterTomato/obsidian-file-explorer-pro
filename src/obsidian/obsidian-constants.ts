// - View type can be found in html search for `data-type`
export const ViewType = {
  Search: 'search',
  FileExplorer: 'file-explorer',
  Markdown: 'markdown'
};

export const HtmlSelector = {
  NavButtonsContainer: 'div.nav-buttons-container',
  ViewActionsContainer: 'div.view-actions'
};

// - Command ids can be found in `plugin.app.commands`
export const CommandIds = {
  FileExplorer: {
    RevealActiveFile: 'file-explorer:reveal-active-file',
  },
  Workspace: {
    EditFileTitle: 'workspace:edit-file-title',
  }
};
