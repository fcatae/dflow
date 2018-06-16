import { workflow, code, runWorkflow } from './workflow'

console.log('hello world')

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
runWorkflow('wf1'); // init
runWorkflow('wf1'); // exec