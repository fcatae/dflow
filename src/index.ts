import { workflow } from './workflow'
import { Bot } from './bot'

var bot = new Bot(['yes', 'ok']);

// sample code
var wf1 = workflow('wf1', (code: any) => {

    code('contagem', (vars: any) => {
        code('init', ()=> {
            vars.a = 1;
            vars.b = 2;
            vars.c = 3;
        });
        code('a1', () => { bot.send(vars.a); vars.a++; });
        code('a2', () => { bot.send(vars.a); vars.a++; });
        code('a3', () => { bot.send(vars.a); vars.a++; });
        code('fim', () => { bot.send('soma: ' + vars.a + vars.b + vars.c); });
    }, { timeout: 1000 });

    code('phase1', () => {
        bot.send("atencao")
        bot.send("tecle 1")
    });

    // if(digi != 1) goto('phase1')

    code('phase2', () => {
        bot.send("atencao, tivemos um incidente {incId} no dia de hoje")
        bot.send("tecle 2 para confirmar ciencia sobre o problema")
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
