console.log('hello world')

// implementation
var workflows: {[name:string]: Function} = {}

function workflow(name: string, func: Function, timeout: number) : any {
    workflows[name] = func;
}

function code(name: string, func: Function, timeout?: number) : any {
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
workflows['wf1']();