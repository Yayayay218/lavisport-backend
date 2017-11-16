import React from 'react';
import {
    Create,
    Edit,
    List,
    SimpleForm,
    FormTab,
    TabbedForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput,
    ReferenceManyField,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    ImageInput,
    ImageField,
    BooleanField,
    SelectInput,
    BooleanInput,
    NumberInput
} from 'admin-on-rest';

import {required} from 'admin-on-rest'

export const MatchList = (props) => (
    <List {...props} sort={{field: 'index', order: 'ASC'}}>
        <Datagrid>
            <TextField source="title" label="Match"/>
            <TextField source="description" label="Description"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
        {/*<CustomDragGrid/>*/}
    </List>
);

export const MatchCreate = (props) => (
    <Create {...props}>
        <SimpleForm label="Match's Information">
            <TextInput source="title" label="Match Name" validate={[required]}/>
            <TextInput source="description" validate={[required]}/>
        </SimpleForm>
    </Create>
);
const MatchTitle = ({record}) => {
    return <span>Match {record ? `"${record.name}"` : ''}</span>;
};
export const MatchEdit = (props) => (
    <Edit title={<MatchTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput label="Match Id" source="id"/>
            <TextInput source="title" validate={[required]}/>
            <TextInput source="description"/>
        </SimpleForm>
    </Edit>
);