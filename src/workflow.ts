// implementation
var workflows: {[name:string]: Function} = {}
var codeblocks: {[name:string]: Function} = {}
var current: any = {};

export function workflow(name: string, func: Function, timeout: number) : any {
    workflows[name] = func;
    current.codeblocks = {}
}

export function code(name: string, func: Function, timeout?: number) : any {
    current.codeblocks[name] = func;
}

export function runWorkflow(name: string) {
    workflows[name]();
}