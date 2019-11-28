export interface ITodo {
    id?: string;
    title: string;
    desc: string;
    isComplete: boolean;
}

export class Todo implements ITodo {
    id?: string;
    title: string;
    desc: string;
    isComplete: boolean;
    index?: number;

    constructor(o?: ITodo) {
        this.id = o && o.id || undefined;
        this.title = o && o.title || 'Title';
        this.desc = o && o.desc || 'Description';
        this.isComplete = o && o.isComplete || false;
    }
}
