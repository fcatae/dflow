import { CodeBlock } from './codeblock';

export class CodeFrame {
    parent: CodeFrame

    constructor(parent: CodeFrame) {
        this.parent = parent;
    }

    code(name: string, func: Function, timeout?: number) : any {
        var codeBlock = new CodeBlock(name, func, timeout);
        
        return {
            run: () => codeBlock.exec()
        }
    }
}

export class ContextExecution {
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
    
    exec(codeBlock: CodeBlock) {
        if( this.currentFrame == null ) {
            throw 'invalid current fame';
        }
        var oldContext= <CodeFrame>this.currentFrame;
        var newContext = new CodeFrame(oldContext);

        this.setCurrent(newContext);
        try {
            codeBlock.exec();    
        }
        finally{
            this.setCurrent(oldContext);
        }
    }
}
