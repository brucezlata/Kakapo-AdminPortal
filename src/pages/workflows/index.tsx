
import React, { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';

import { Kakapo } from '../../types/kakapo';
import { WorkflowService } from '../../service/WorkflowsService';

const Workflows = () => {

    let emptyWorkflow: Kakapo.Workflow = {
        id: '',
        workflowId: '',
        name: '',
        status: '',
        starttime: '',
        template: '',
        templateType: '',
        owner: '',
        namespace: ''
    };

    const [workflows, setWorkflows] = useState<Kakapo.Workflow[]>([]);
    const [workflowDialog, setWorkflowDialog] = useState(false);
    const [deleteWorkflowDialog, setDeleteWorkflowDialog] = useState(false);
    const [deleteWorkflowsDialog, setDeleteWorkflowsDialog] = useState(false);
    const [workflow, setWorkflow] = useState<Kakapo.Workflow>(emptyWorkflow);
    const [selectedWorkflows, setSelectedWorkflows] = useState<Kakapo.Workflow[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Kakapo.Workflow[]>>(null);

    useEffect(() => {
        WorkflowService.getWorkflows().then((data) => setWorkflows(data));
    }, []);

    const openNew = () => {
        setWorkflow(emptyWorkflow);
        setSubmitted(false);
        setWorkflowDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setWorkflowDialog(false);
    };

    const hideDeleteWorkflowDialog = () => {
        setDeleteWorkflowDialog(false);
    };

    const hideDeleteWorkflowsDialog = () => {
        setDeleteWorkflowsDialog(false);
    };

    const saveWorkflow = () => {
        setSubmitted(true);

        if (workflow.name.trim()) {
            let _workflows = [...workflows];
            let _workflow = { ...workflow };
            if (workflow.id) {
                const index = findIndexById(workflow.id);

                _workflows[index] = _workflow;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Workflow Updated', life: 3000 });
            } else {
                _workflow.id = createId();
                _workflows.push(_workflow);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Workflow Created', life: 3000 });
            }

            setWorkflows(_workflows);
            setWorkflowDialog(false);
            setWorkflow(emptyWorkflow);
        }
    };

    const editWorkflow = (workflow: Kakapo.Workflow) => {
        setWorkflow({ ...workflow });
        setWorkflowDialog(true);
    };

    const confirmDeleteWorkflow = (workflow: Kakapo.Workflow) => {
        setWorkflow(workflow);
        setDeleteWorkflowDialog(true);
    };

    const deleteWorkflow = () => {
        let _workflows = workflows.filter((val) => val.id !== workflow.id);
        setWorkflows(_workflows);
        setDeleteWorkflowDialog(false);
        setWorkflow(emptyWorkflow);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Workflow Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < workflows.length; i++) {
            if (workflows[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const confirmDeleteSelected = () => {
        setDeleteWorkflowsDialog(true);
    };

    const deleteSelectedWorkflows = () => {
        let _workflows = workflows.filter((val) => !selectedWorkflows?.includes(val));
        setWorkflows(_workflows);
        setDeleteWorkflowsDialog(false);
        setSelectedWorkflows([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Workflows Deleted', life: 3000 });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedWorkflows || !selectedWorkflows.length} />
                </div>
            </React.Fragment>
        );
    };

    const nameBodyTemplate = (rowData: Kakapo.Workflow) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };


    const statusBodyTemplate = (rowData: Kakapo.Workflow) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`workflow-badge status-${rowData.status?.toLowerCase()}`}>{rowData.status}</span>
            </>
        );
    };

    const actionBodyTemplate = (rowData: Kakapo.Workflow) => {
        return (
            <>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteWorkflow(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <span className="block mt-3 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const workflowDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveWorkflow} />
        </>
    );
    const deleteWorkflowDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteWorkflowDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteWorkflow} />
        </>
    );
    const deleteWorkflowsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteWorkflowsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedWorkflows} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={workflows}
                        selection={selectedWorkflows}
                        onSelectionChange={(e) => setSelectedWorkflows(e.value as Kakapo.Workflow[])}
                        dataKey="workflowId"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        globalFilter={globalFilter}
                        emptyMessage="No workflows found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="workflowId" header="Id" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="starttime" header="StartTime" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="template" header="Template"  sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="templateType" header="TemplateType" headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="owner" header="Owner" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="namespace" header="Namespace" headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={workflowDialog} style={{ width: '450px' }} header="Workflow Details" modal className="p-fluid" footer={workflowDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={workflow.name} required autoFocus className={classNames({ 'p-invalid': submitted && !workflow.name })} />
                            {submitted && !workflow.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="parameters">Parameters</label>
                            <InputTextarea id="parameters" required rows={3} cols={20} />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteWorkflowDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteWorkflowDialogFooter} onHide={hideDeleteWorkflowDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {workflow && (
                                <span>
                                    Are you sure you want to delete <b>{workflow.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteWorkflowsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteWorkflowsDialogFooter} onHide={hideDeleteWorkflowsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {workflow && <span>Are you sure you want to delete the selected {selectedWorkflows.length} workflows?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default Workflows;
