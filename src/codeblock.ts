export class CodeBlock {
    private name: string;
    private codeDefinition: Function;
    private childBlocks?: {[name:string]: CodeBlock};
    private _isReady: Boolean = false;

    static CreateRoot(name: string) {
        return new CodeBlock(name, ()=>{});
    }
    
    constructor(name: string, func: Function, timeout?: number) {
        this.name = name;        
        this.codeDefinition = func;
    }

    get isReady() { return this._isReady };

    init(): void {
        this.codeDefinition();
        this._isReady = true;
    }

    exec(): void {
        this.codeDefinition();
    }    

    addBlock(name: string, block: CodeBlock) {
        this.childBlocks = this.childBlocks || {}
        if(this.childBlocks == undefined) {
            this.childBlocks = {}
        }
        if(name in this.childBlocks) {
            throw ('code block already defined: ' + name)
        }
        this.childBlocks[name] = block;
    }

    getBlock(name: string) {
        if(this.childBlocks == undefined) {
            throw 'code block not initialized';
        }
            
        return this.childBlocks[name];
    }

    getBlockRecursive(path: string): CodeBlock {
        var names = path.split('-', 2);

        var block = this.getBlock(names[0]);

        if( names.length > 1 ) {
            return block.getBlockRecursive(names[1])
        }

        return block;
    }
}