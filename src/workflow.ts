// implementation
var current: any = {};
var worklist: {[name: string]: Workflow} = {};

export function workflow(name: string, func: Function, timeout: number) : any {
    worklist[name] = new Workflow(name, func, timeout);
}

export function code(name: string, func: Function, timeout?: number) : any {
    current.codeblocks = current.codeblocks || {}

    if(name in current.codeblocks) {
        var codeDefinition = current.codeblocks[name];
        codeDefinition();
    } else {
        current.codeblocks[name] = func;
    }    
}

export function getWorkflow(name: string): Workflow {
    return worklist[name];
}

export class Workflow {
    private name: string;
    private workDefinition: Function;
    private codeblocks: {[name:string]: Function}

    constructor(name: string, func: Function, timeout: number) {
        this.name = name;
        this.workDefinition = func;
        this.codeblocks = {};
    }

    init(): void {
        this.workDefinition();
    }
    exec(): void {
        this.workDefinition();
    }
}