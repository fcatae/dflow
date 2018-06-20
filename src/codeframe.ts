import { CodeBlock } from './codeblock';

export class CodeFrame {
    parent: CodeFrame | null
    codeBlock: CodeBlock
    codeParam: any;
    path: string;
    
    constructor(parent: CodeFrame | null, codeBlock: CodeBlock, codeParam: any) {
        this.parent = parent;
        this.codeBlock = codeBlock;
        this.codeParam = codeParam;
        this.path = (parent != null ? parent.path + '-' : '') + codeBlock.name;
    }

    exec(filter?: any) {
        if((filter == null) || filter(this.path)) {
            this.codeBlock.exec(this.codeParam);
        }
    }
}

export class ExecutionContext {
    private static globalInstanceId = 0;
    currentFrame: CodeFrame | null;
    name: string;    
    private filter: any;

    constructor() {
        this.name = (++ExecutionContext.globalInstanceId).toString();
        this.currentFrame = null;
    }
        
    static create(codeBlock: CodeBlock, filter?: any) {
        var execCtx = new ExecutionContext();

        execCtx.start(codeBlock, 
            ((name: string, func: Function, options: { timeout?:number } = {}) : any => {
                var codeBlock = new CodeBlock(name, func, options.timeout);
                execCtx.exec(codeBlock);
            }),
            filter
        );
    }

    setCurrent(frame: CodeFrame | null): void{
        this.currentFrame = frame;
    }

    getCurrent(): CodeFrame {
        if(this.currentFrame == null) {
            throw 'invalid current fame';
        }
        return this.currentFrame as CodeFrame;
    }

    start(codeBlock: CodeBlock, param: any, filter?: any) {
        if( this.currentFrame != null ) {
            throw 'invalid current fame: code already running';
        }
        this.filter = filter;        
        this.startInContext(codeBlock, param);
    }

    exec(codeBlock: CodeBlock) {
        if( this.currentFrame == null ) {
            throw 'invalid current fame';
        }
        this.execInContext(codeBlock);
    }    

    private startInContext(codeBlock: CodeBlock, param: any) {
        var parentContext= this.currentFrame as CodeFrame;
        var childContext = new CodeFrame(parentContext, codeBlock, param);

        this.setCurrent(childContext);
        try {
            childContext.exec(this.filter); 
        }
        finally{
            this.setCurrent(parentContext);
        }
    }

    private execInContext(codeBlock: CodeBlock) {
        var parentContext= this.currentFrame as CodeFrame;
        var childContext = new CodeFrame(parentContext, codeBlock, {});

        this.setCurrent(childContext);
        try {
            childContext.exec(this.filter); 
        }
        finally{
            this.setCurrent(parentContext);
        }
    }
}
