import { workflow } from './workflow'

var never_run = () => {

    // sample code
var wf1 = workflow('wf1', (param:any) => {

    var use = (p:any):any=>param;

    var init = use('init');
    var code = use('code');
    var bot = use('bot');

    code('contagem', (vars: any) => {

        code('init', ()=> {
            for(vars.a = 1; vars.a<=10; vars.a++) {
                console.log('count: ' + vars.a);
            }
        });
            
        code('robust', ()=> {
            for(init(vars.a, 1); vars.a<=10; vars.a++) {
                code('line', ()=>{
                    console.log('count: ' + vars.a);
                })                
            }
        });

        code('userinput', ()=>{ 
            vars.isValid = (vars.a == 3);
        });

        code('ifValid', ()=>{
            if(vars.isValid) {
                code('then', () => { console.log(vars.a); vars.a++; });
            } else {
                code('else', () => { console.log(vars.a); vars.a++; });
            }
        });
    },
    { timeout: 40 });

}, { timeout: 1000 })

}