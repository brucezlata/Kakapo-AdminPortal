import { Kakapo } from '../types/kakapo';

export const WorkflowService = {
    getWorkflows() {
        return fetch('/demo/data/workflows.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Kakapo.Workflow[]);
    }
};
