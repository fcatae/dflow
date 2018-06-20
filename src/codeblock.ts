export class CodeBlock {
    name: string;
    private codeDefinition: Function;

    constructor(name: string, func: Function, timeout?: number) {
        this.name = name;        
        this.codeDefinition = func;
    }

    exec(param: any): void {
        this.codeDefinition(param);
    }
}