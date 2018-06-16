import { workflow, code, runWorkflow } from './workflow'

console.log('hello world')

// sample code
workflow('wf1', () => {

    code('phase1', () => {
        console.log("atencao")
        console.log("tecle 1")
    });

    code('phase2', () => {
        console.log("atencao, tivemos um incidente {incId} no dia de hoje")
        console.log("tecle 2 para confirmar ciencia sobre o problema")
    });

}, 1000)

// phase 1: initialize
runWorkflow('wf1');