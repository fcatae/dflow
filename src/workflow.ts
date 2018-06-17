import { ExecutionContext, CodeFrame } from './codeframe';
import { CodeBlock } from './codeblock';

var execCtx: ExecutionContext = new ExecutionContext('root');

function assertValidContext(execCtx?: ExecutionContext) {
    if(execCtx == null) throw 'namespace not defined';
}

export function code(name: string, func: Function, options: { timeout?:number } = {}) : any {
    assertValidContext(execCtx);

    var codeBlock = new CodeBlock(name, func, options.timeout);

    // execute in the appropriate context
    execCtx.exec(codeBlock);
}

export function workflow(name: string, func: Function, options: { timeout?:number } = {}) : any {
    assertValidContext(execCtx);

    return new Workflow(name, func, options);
}

export class Workflow {
    name: string;
    func: Function;
    options: { timeout?:number };

    constructor(name: string, func: Function, options: { timeout?:number } = {}) {
        this.name = name;
        this.func = func;
        this.options = options;
    }

    run() {
        execCtx = new ExecutionContext('root');

        var codeBlock = new CodeBlock(this.name, this.func, this.options.timeout);

        execCtx.start(codeBlock);
    }
}