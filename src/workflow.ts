import { ContextExecution, CodeFrame } from './codeframe';
import { CodeBlock } from './codeblock';

var execCtx: ContextExecution = new ContextExecution('root');

export function code(name: string, func: Function, options: { timeout?:number } = {}) : any {
    if(execCtx == null) {
        throw 'namespace not defined'
    }

    return {
        run: () => { 
            var current = execCtx.getCurrent();
            current.code(name, func, options.timeout);
        }
    }
}