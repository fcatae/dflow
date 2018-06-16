// implementation
var current: CodeBlock;
var worklist: {[name: string]: CodeBlock} = {};

export function workflow(name: string, func: Function, timeout: number): void {
    var workflow = new CodeBlock(name, func, timeout);
    current = workflow;
    workflow.init();
    
    worklist[name] = workflow;
}

export function code(name: string, func: Function, timeout?: number) : any {
    if(current == null) {
        throw 'code block not defined'
    }

    if(!current.isReady) {
        current.addBlock(name, func);
    } else {
        var codeBlock = current.getBlock(name);
        codeBlock();
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
    private _isReady: Boolean = false;

    constructor(name: string, func: Function, timeout: number) {
        this.name = name;        
        this.codeDefinition = func;
    }

    get isReady() { return this._isReady };

    init(): void {
        this.codeDefinition();
        this._isReady = true;
    }

    exec(): void {
        this.codeDefinition();
    }    

    addBlock(name: string, block: Function) {
        this.childBlocks = this.childBlocks || {}
        if(this.childBlocks == undefined) {
            this.childBlocks = {}
        }
        if(name in this.childBlocks) {
            throw ('code block already defined: ' + name)
        }
        this.childBlocks[name] = block;
    }
    
    getBlock(name: string) {
        if(this.childBlocks == undefined) {
            throw 'code block not initialized';
        }
            
        return this.childBlocks[name];
    }
}