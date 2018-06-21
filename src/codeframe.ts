import { CodeBlock } from './codeblock';
import { Workflow, WorkflowState } from './workflow';

export class CodeFrame {
    root: ExecutionContext;
    parent: CodeFrame | null
    codeBlock: CodeBlock
    codeParam: any;
    path: string;
    
    constructor(root: ExecutionContext, parent: CodeFrame | null, codeBlock: CodeBlock, codeParam: any) {
        this.root = root;
        this.parent = parent;
        this.codeBlock = codeBlock;
        this.codeParam = codeParam;
        this.path = (parent != null ? parent.path + '-' : '') + codeBlock.name;
    }

    exec(filter?: any) {
        if((filter == null) || filter(this.path, this)) {
            var restoreState = this.root.restoreState;

            var storeVars: any[];
            if(restoreState && this.path == restoreState.path) {
                storeVars = this.getStackVariables();
                //this.restoreStackVariables(restoreState.variables);
            }
            this.codeBlock.exec(this.codeParam);
        }
    }

    restoreStackVariables(variables: Array<any>) {
        var current : CodeFrame = this;
        for(var i=0; i<variables.length; i++) {
            current.codeParam = variables[i];
            if( current.parent != null ) {
                current = current.parent;
            }            
        }
    }

    getStackVariables(): Array<any> {    
        var stackVariables: Array<any> = [];
        this.buildStackVariables(stackVariables);
        return stackVariables;
    }

    private buildStackVariables(variables: Array<any>) {
        variables.push(this.codeParam);
        if( this.parent != null ) {
            this.parent.buildStackVariables(variables);
        }
    }
}

export class ExecutionContext {
    private static globalInstanceId = 0;
    currentFrame: CodeFrame | null;
    name: string;    
    restoreState: WorkflowState | null;
    private nesting: number;
    private filter: any;
    
    constructor(restoreState: WorkflowState | null = null) {
        this.name = (++ExecutionContext.globalInstanceId).toString();
        this.currentFrame = null;
        this.restoreState = restoreState;
        this.nesting = 0;
    }

    startCode(codeBlock: CodeBlock, filter?: any) {
        if( this.currentFrame != null ) {
            throw 'invalid current fame: code already running';
        }
        
        var codeFunction = ((name: string, func: Function, options: { timeout?:number } = {}, param?: any) : any => {
            var codeBlock = new CodeBlock(name, func, options.timeout);

            this.exec(codeBlock, param);
        });

        this.filter = filter;        
        this.startInContext(codeBlock, codeFunction);
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

    exec(codeBlock: CodeBlock, param?: any) {
        if( this.currentFrame == null ) {
            throw 'invalid current fame';
        }
        this.execInContext(codeBlock, param);
    }    

    private startInContext(codeBlock: CodeBlock, param: any) {
        var parentContext= this.currentFrame as CodeFrame;
        var childContext = new CodeFrame(this, parentContext, codeBlock, param);

        this.setCurrent(childContext);
        try {
            this.nesting++;
            childContext.exec(this.filter); 
        }
        finally{
            this.nesting--;
            this.setCurrent(parentContext);
        }
    }

    private execInContext(codeBlock: CodeBlock, param?: any) {
        if( this.restoreState != null ) {
            var variables = this.restoreState.variables;
            var index = variables.length - this.nesting - 1;
            
            if( index >= 0 ) {
                var value =  variables[index];
                param = value;
            }
        }

        var parentContext= this.currentFrame as CodeFrame;
        var childContext = new CodeFrame(this, parentContext, codeBlock, param);

        this.setCurrent(childContext);
        try {
            this.nesting++;
            childContext.exec(this.filter); 
        }
        finally{
            this.nesting--;
            this.setCurrent(parentContext);
        }
    }
}
