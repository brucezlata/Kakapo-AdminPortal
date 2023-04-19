declare namespace Kakapo {
    type Workflow = {
        id?: string;
        workflowId?: string;
        name: string;
        status: string;
        starttime?: string;
        template?: string;
        templateType?: string;
        owner?: string;
        namespace?: string;
    };
}

export type {
    Kakapo
}