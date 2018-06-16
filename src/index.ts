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

    code('contagem', () => {
        console.log('123')
        code('a1', () => { console.log('1') });
        code('a2', () => { console.log('2') });
        code('a3', () => { console.log('3') });
    });

}, 1000)

// phase 1: initialize
runWorkflow('wf1');
runWorkflow('wf1');
