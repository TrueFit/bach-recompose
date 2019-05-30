import renameProps from './renameProps';

export default (oldName, newName) => renameProps({[oldName]: newName});
