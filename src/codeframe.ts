import { CodeBlock } from './codeblock';
import { code } from './workflow';

export class CodeFrame {
    parent: CodeFrame | null
    codeBlock: CodeBlock
    private indexBlocks: {[name:string]: CodeBlock} = {};
    
    constructor(parent: CodeFrame | null, codeBlock: CodeBlock) {
        this.parent = parent;
        this.codeBlock = codeBlock;
    }

    exec(filter?: any) {
        this.codeBlock.exec();
    }

    addBlock(name: string, block: CodeBlock) {
        if(name in this.indexBlocks) {
            throw ('code block already defined: ' + name)
        }
        this.indexBlocks[name] = block;
    }

    getBlock(name: string) {
        if(this.indexBlocks == undefined) {
            throw 'code block not initialized';
        }
            
        return this.indexBlocks[name];
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
        return <CodeFrame>this.currentFrame;
    }

    start(codeBlock: CodeBlock, filter?: any) {
        var parentContext= <CodeFrame>this.currentFrame;
        var childContext = new CodeFrame(parentContext, codeBlock);

        this.setCurrent(childContext);
        try {
            childContext.exec(filter); 
        }
        finally{
            this.setCurrent(parentContext);
        }
    }

    exec(codeBlock: CodeBlock, filter?: any) {
        if( this.currentFrame == null ) {
            throw 'invalid current fame';
        }
        this.start(codeBlock, filter);
    }
}
