import { code, workflow } from './workflow'

// sample code
var wf1 = workflow('wf1', () => {

    code('contagem', (init_variables = [1, 2, 3]) => {
        var [a,b,c] = init_variables;

        code('a1', () => { console.log(a); a++; });
        code('a2', () => { console.log(a); a++; });
        code('a3', () => { console.log(a); a++; });
        code('fim', () => { console.log(a+b+c); });
    });

    code('phase1', () => {
        console.log("atencao")
        console.log("tecle 1")
    });

    // if(digi != 1) goto('phase1')

    code('phase2', () => {
        console.log("atencao, tivemos um incidente {incId} no dia de hoje")
        console.log("tecle 2 para confirmar ciencia sobre o problema")
    });

}, { timeout: 1000 })

wf1.run();

// var processor;
// var p1 = processor.run(wf1)
// p1.pause();
// p1.resume();
// p1.logs();
// p1.runStep();
// p1.kill();

wf1.run();
