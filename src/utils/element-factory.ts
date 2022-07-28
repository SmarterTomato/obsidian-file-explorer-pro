function createNavActionButton(icon: string, className = '') {
  const div = document.createElement('div');
  div.className = `nav-action-button ${className}`;
  div.innerHTML = icon;

  return div;
}

function createViewActionButton(icon: string, className = '') {
  const a = document.createElement('a');
  a.className = `view-action ${className}`;
  a.innerHTML = icon;

  return a;
}

export const ElementFactory = {
  createNavActionButton,
  createViewActionButton
};