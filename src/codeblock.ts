export class CodeBlock {
    private name: string;
    private codeDefinition: Function;
    // private indexBlocks: {[name:string]: CodeBlock} = {};

    constructor(name: string, func: Function, timeout?: number) {
        this.name = name;        
        this.codeDefinition = func;
    }

    exec(): void {
        this.codeDefinition();
    }
    
    // addBlock(name: string, block: CodeBlock) {
    //     if(name in this.indexBlocks) {
    //         throw ('code block already defined: ' + name)
    //     }
    //     this.indexBlocks[name] = block;
    // }

    // getBlock(name: string) {
    //     if(this.indexBlocks == undefined) {
    //         throw 'code block not initialized';
    //     }
            
    //     return this.indexBlocks[name];
    // }

    // static CreateRoot(name: string) {
    //     var namespace = new CodeBlock(name, ()=>{});
    //     namespace._isReady = true;
    //     return namespace;
    // }
    
    // get isReady() { return this._isReady };

    // init(): void {
    //     this.codeDefinition();
    //     this._isReady = true;
    // }

    // initChildren(): void {
    //     this.listBlocks.forEach( child => {
    //         child.init();
    //     });
    // }    

    // getBlockRecursive(path: string): CodeBlock {
    //     var names = path.split('-', 2);

    //     var block = this.getBlock(names[0]);

    //     if( names.length > 1 ) {
    //         return block.getBlockRecursive(names[1])
    //     }

    //     return block;
    // }
}