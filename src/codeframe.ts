import { CodeBlock } from './codeblock';
import { code } from './workflow';

export class CodeFrame {
    parent: CodeFrame | null
    codeBlock: CodeBlock
    
    constructor(parent: CodeFrame | null, codeBlock: CodeBlock) {
        this.parent = parent;
        this.codeBlock = codeBlock;
    }

    exec(filter?: any) {
        this.codeBlock.exec();
    }
}

export class ExecutionContext {
    currentFrame: CodeFrame | null;
    name: string;    
    
    constructor(name: string) {
        this.name = name;
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
        this.execInContext(codeBlock, filter);
    }

    exec(codeBlock: CodeBlock, filter?: any) {
        if( this.currentFrame == null ) {
            throw 'invalid current fame';
        }
        this.execInContext(codeBlock, filter);
    }

    private execInContext(codeBlock: CodeBlock, filter?: any) {
        var parentContext= this.currentFrame as CodeFrame;
        var childContext = new CodeFrame(parentContext, codeBlock);

        this.setCurrent(childContext);
        try {
            childContext.exec(filter); 
        }
        finally{
            this.setCurrent(parentContext);
        }
    }
}
