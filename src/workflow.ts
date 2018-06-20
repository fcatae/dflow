import { ExecutionContext, CodeFrame } from './codeframe';
import { CodeBlock } from './codeblock';

var globalExecCtx: ExecutionContext = new ExecutionContext();

function assertValidContext(execCtx?: ExecutionContext) {
    if(execCtx == null) throw 'namespace not defined';
}

export function code2(name: string, func: Function, options: { timeout?:number } = {}) : any {
    assertValidContext(globalExecCtx);

    var codeBlock = new CodeBlock(name, func, options.timeout);

    // execute in the appropriate context
    globalExecCtx.exec(codeBlock);
}

export function workflow(name: string, func: Function, options: { timeout?:number } = {}) : Workflow {
    return new Workflow(name, func, options);
}

class WorkflowState {
    static Done= new WorkflowState('$done')

    path: string
    constructor(path: string) {
        this.path = path;
    }

    isBeforeExecution(path: string) {
        return (this.path.startsWith(path + '-'));
    }

    isExecuting(path: string) {
        return (path == this.path );
    }
}

export class Workflow {
    name: string;
    func: Function;
    options: { timeout?:number };
    private state: WorkflowState | null;
    private codeBlock: CodeBlock;

    constructor(name: string, func: Function, options: { timeout?:number } = {}) {
        this.name = name;
        this.func = func;
        this.options = options;
        this.state = new WorkflowState(name);
        this.codeBlock = new CodeBlock(name, func, options.timeout);
    }
    
    run() {
        var execCtx = ExecutionContext.create(this.codeBlock);
    }
        
    runStep(state: WorkflowState | null = null): WorkflowState {

        if(state == WorkflowState.Done) {
            return WorkflowState.Done;
        }
        
        var execCtx = new ExecutionContext();

        var pendingExecution = true;
        var pendingSetLastState = true;
        var initialState = state || new WorkflowState(this.name);
        var nextState: WorkflowState = WorkflowState.Done;

        ExecutionContext.create(this.codeBlock, (path:string) => { 
            if(pendingExecution) {
                if(initialState.isBeforeExecution(path)) {
                    return true;
                }

                var shouldExecute = initialState.isExecuting(path);
                
                if(!shouldExecute) {
                    return false;
                }
                
                this.setCurrentState(path);
                pendingExecution = false;
                return true;
            }
            
            if(pendingSetLastState) {
                nextState = new WorkflowState(path);
                pendingSetLastState = false;
            }

            return false; 
        });

        return nextState;
    }

    private setCurrentState(path: string) {        
        console.log('current execution: ' + path);
        this.state = new WorkflowState(path);
    }

    getState() {
        return this.state;
    }
}