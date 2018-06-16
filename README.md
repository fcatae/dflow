# dflow

``` 
expose('wf1', '/api/workflow/wf1');
// POST /api/workflow/wf1
// GET  /api/workflow/wf1/<instance>
// GET  /api/workflow/wf1/<instance>/logs
// POST /api/workflow/wf1/<instance>/cancel
  
workflow('wf1', (telegram, opcao) => {

    telegram = instance<telegram>()

    code('phase1', () => {
        telegram.send $"atencao, tivemos um incidente {incId} no dia de hoje"
        telegram.send "tecle 1 para confirmar ciencia sobre o problema"
    });

    opcao = wait<int>('phase2', telegram.read , timeout = 200);

    code('validate', (last) => {

        last = code('httpget', (client) => {
           client = new HttpClient();
           r = client.get 'http://localhost'
           return r.data
        })

        code('httppost', (client2) => {
           client = new HttpClient();
           r = client.post 'http://localhost'

           if( r.status != 200 )
              throw new Invalid()
        })

    })

    code('phase3', (phone, opcao_tel) => {

        phone = use<phone>()

        code('intro', () => {
            opcao_tel = 1

            if( opcao == null ) {
                phone.say "Olá bom dia"

                phone.say "Temos um incidente {incId}"
                phone.say "Digite 9 para confirmar conhecimento"
            }
        }),
        
        wait('confirma', phone.read_digit, timeout = 10),
        
        code('fim', () => {
            if( opcao_tel != "9" ) return Goto('phase3')
            
            phone.say "Obrigado"
        })
      }
    })

}, timeout = 1000)

```
