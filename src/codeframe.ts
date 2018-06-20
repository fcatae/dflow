import { CodeBlock } from './codeblock';
import { code } from './workflow';

export class CodeFrame {
    parent: CodeFrame | null
    codeBlock: CodeBlock
    path: string;
    
    constructor(parent: CodeFrame | null, codeBlock: CodeBlock) {
        this.parent = parent;
        this.codeBlock = codeBlock;
        this.path = (parent != null ? parent.path + '-' : '') + codeBlock.name;
    }

    exec(filter?: any) {
        if((filter == null) || filter(this.path)) {
            this.codeBlock.exec();
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
    
    setCurrent(frame: CodeFrame | null): void{
        this.currentFrame = frame;
    }

    getCurrent(): CodeFrame {
        if(this.currentFrame == null) {
            throw 'invalid current fame';
        }
        return this.currentFrame as CodeFrame;
    }

    start(codeBlock: CodeBlock, filter?: any) {
        if( this.currentFrame != null ) {
            throw 'invalid current fame: code already running';
        }
        this.filter = filter;        
        this.execInContext(codeBlock);
    }

    exec(codeBlock: CodeBlock) {
        if( this.currentFrame == null ) {
            throw 'invalid current fame';
        }
        this.execInContext(codeBlock);
    }

    private execInContext(codeBlock: CodeBlock) {
        var parentContext= this.currentFrame as CodeFrame;
        var childContext = new CodeFrame(parentContext, codeBlock);

        this.setCurrent(childContext);
        try {
            childContext.exec(this.filter); 
        }
        finally{
            this.setCurrent(parentContext);
        }
    }
}
