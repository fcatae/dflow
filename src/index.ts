import { workflow } from './workflow'
import { Bot } from './bot'

var bot = new Bot(['yes', '1', 'oi?']);

function randomFailure(rate: number) {
    var rnd = Math.random();
    if(rnd < rate) throw 'random failure';
}

// sample code
var wf1 = workflow('wf1', (code: any) => {

    code('contagem', (vars: any) => {
        code('init', ()=>{
            vars.i = 1;
        })
        code('for', ()=>{
            for(; vars.i<10; vars.i++) {
                randomFailure(0.3);
                bot.send('message: ' + vars.i);
            }
        }, {retry: 5})
    });

    code('contagem2', (vars: any) => {
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
        bot.send("atencao");

        var digi = '';
        while(digi != '1') {
            bot.send("tecle 1");
            digi = bot.recv();
        }

    });


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
