// implementation
var current: any = {};
var worklist: {[name: string]: CodeBlock} = {};

export function workflow(name: string, func: Function, timeout: number) : any {
    var workflow = new CodeBlock(name, func, timeout);
    workflow.init();

    worklist[name] = workflow;
}

export function code(name: string, func: Function, timeout?: number) : any {
    current.codeblocks = current.codeblocks || {}

    var isReady = name in current.codeblocks;

    if(!isReady) {
        current.codeblocks[name] = func;
    } else {
        var codeDefinition = current.codeblocks[name];
        codeDefinition();
    }    
}

export function runWorkflow(name: string): any {
    var workflow = worklist[name];
    workflow.exec();
}

class CodeBlock {
    private name: string;
    private codeDefinition: Function;
    private childBlocks?: {[name:string]: Function};

    constructor(name: string, func: Function, timeout: number) {
        this.name = name;        
        this.codeDefinition = func;
    }

    get isReady() { return this.childBlocks != undefined };

    init(): void {
        this.codeDefinition();
    }
    exec(): void {
        this.codeDefinition();
    }
}