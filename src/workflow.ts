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

export class WorkflowState {
    static Done= new WorkflowState('$done', [])

    path: string
    variables: Array<any>
    
    constructor(path: string, localVariables: Array<any>) {
        this.path = path;
        this.variables = localVariables;
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
        this.state = new WorkflowState(name, []);
        this.codeBlock = new CodeBlock(name, func, options.timeout);
    }
    
    run() {
        var execCtx = new ExecutionContext();
        execCtx.startCode(this.codeBlock);
    }
        
    runStep(state: WorkflowState | null = null): WorkflowState {

        if(state == WorkflowState.Done) {
            return WorkflowState.Done;
        }
        var pendingExecution = true;
        var pendingSetLastState = true;
        var initialState = state || new WorkflowState(this.name, []);
        var nextState: WorkflowState = WorkflowState.Done;

        var execCtx = new ExecutionContext(initialState);

        execCtx.startCode(this.codeBlock, (path:string, frame: CodeFrame) => { 
            if(pendingExecution) {
                if(initialState.isBeforeExecution(path)) {
                    return true;
                }

                var shouldExecute = initialState.isExecuting(path);
                
                if(!shouldExecute) {
                    return false;
                }
                
                this.setCurrentState(execCtx, initialState);
                pendingExecution = false;
                return true;
            }
            
            if(pendingSetLastState) {
                var stackVariables = frame.getStackVariables();
                nextState = new WorkflowState(path, stackVariables);
                pendingSetLastState = false;
            }

            return false; 
        });

        return nextState;
    }

    private setCurrentState(execCtx: ExecutionContext, state: WorkflowState | null) {        
        this.state = state;
        if( state != null ) {
            console.log('current execution: ' + state.path);
            execCtx.restoreState = state;
        }
    }

    getState() {
        return this.state;
    }
}