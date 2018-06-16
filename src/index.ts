console.log('hello world')

// implementation
var workflows: {[name:string]: Function} = {}
var codeblocks: {[name:string]: Function} = {}
var current: any = {};

function workflow(name: string, func: Function, timeout: number) : any {
    workflows[name] = func;
    current.codeblocks = {}
}

function code(name: string, func: Function, timeout?: number) : any {
    current.codeblocks[name] = func;
}

// sample code
workflow('wf1', () => {

    console.log('wf1 started');
    
    code('phase1', () => {
        console.log("atencao, tivemos um incidente {incId} no dia de hoje")
        console.log("tecle 1 para confirmar ciencia sobre o problema")
    });

    code('phase1', () => {
        console.log("atencao, tivemos um incidente {incId} no dia de hoje")
        console.log("tecle 1 para confirmar ciencia sobre o problema")
    });

}, 1000)

// phase 1: initialize
workflows['wf1'](); // init
workflows['wf1'](); // exec