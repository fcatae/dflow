import { workflow } from './workflow'

// sample code
var wf1 = workflow('wf1', (code: any) => {

    code('contagem', (v: any) => {
        code('a1', () => { console.log(v.a); 
            v.a++; });
        code('a2', () => { console.log(v.a); v.a++; });
        code('a3', () => { console.log(v.a); v.a++; });
        code('fim', () => { console.log('soma: ' + v.a + v.b + v.c); });
    }, { timeout: 1000 }, {a: 1, b: 2, c: 3});

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

// wf1.run();
var s = null;
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);
s = wf1.runStep(s);

// var processor;
// var p1 = processor.run(wf1)
// p1.pause();
// p1.resume();
// p1.logs();
// p1.runStep();
// p1.kill();

wf1.run();
