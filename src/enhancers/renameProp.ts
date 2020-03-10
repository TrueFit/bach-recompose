import {EnhancerContext, EnhancerResult} from '@truefit/bach';
import renameProps from './renameProps';

export default <T>(oldName: string, newName: keyof T): ((c: EnhancerContext) => EnhancerResult) =>
  renameProps({[oldName]: newName});
