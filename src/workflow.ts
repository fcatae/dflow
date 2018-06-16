import { CodeBlock } from './codeblock'

// implementation
var rootNamespace = CodeBlock.CreateRoot('root');
var current: CodeBlock;
//var worklist: {[name: string]: CodeBlock} = {};

export function workflow(name: string, func: Function, timeout: number): void {
    var workflow = new CodeBlock(name, func, timeout);
    current = workflow;
    workflow.init();
        
    rootNamespace.addBlock(name, workflow);
}

export function code(name: string, func: Function, timeout?: number) : any {
    if(current == null) {
        throw 'code block not defined'
    }

    var oldFrame = current;
    if(!current.isReady) {
        var codeBlock = new CodeBlock(name, func, timeout);
        current.addBlock(name, codeBlock);

        current = codeBlock;
        codeBlock.init();
    } else {                
        var codeBlock = current.getBlock(name);

        current = codeBlock;
        codeBlock.exec();        
    }    
    current = oldFrame;
}

export function runWorkflow(path: string): any {
    var block = rootNamespace.getBlockRecursive(path);
    block.exec();
}