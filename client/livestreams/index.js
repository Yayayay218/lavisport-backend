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
import EmbeddedManyInput from './AddManyChannels';
import RoleField from './RoleField'

export const LivestreamList = (props) => (
    <List {...props} sort={{field: 'index', order: 'ASC'}}>
        <Datagrid>
            <TextField source="title"/>
            <TextField source="description"/>
            <RoleField source="status"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const LivestreamCreate = (props) => (
    <Create {...props}>
        <SimpleForm label="Livestream's Information">
            <TextInput source="title" validate={[required]}/>
            <TextInput source="description" validate={[required]}/>
            <SelectInput source="status" choices={[
                {id: '0', name: 'Unpublished'},
                {id: '1', name: 'Upcoming'},
                {id: '2', name: 'Live'},
            ]}/>
            <EmbeddedManyInput source="channels">
                <TextInput source="title" label="Channel Name" validate={[required]}/>
                <TextInput source="link" validate={[required]}/>
            </EmbeddedManyInput>
        </SimpleForm>
    </Create>
);
const LivestreamTitle = ({record}) => {
    console.log(record)
    return <span>Livestream {record ? `"${record.title}"` : ''}</span>;
};
export const LivestreamEdit = (props) => {
    return (
        <Edit title={<LivestreamTitle/>} {...props}>
            <SimpleForm>
                <DisabledInput label="Livestream Id" source="id"/>
                <TextInput source="title" validate={[required]}/>
                <TextInput source="description"/>
                <SelectInput source="status" choices={[
                    {id: '0', name: 'Unpublished', key: '1'},
                    {id: '1', name: 'Upcoming', key: '1'},
                    {id: '2', name: 'Live', key: '1'},
                ]}/>
                <EmbeddedManyInput source="channels">
                    <TextInput source="title" validate={[required]}/>
                    <TextInput source="link" validate={[required]}/>
                </EmbeddedManyInput>
            </SimpleForm>
        </Edit>
    )
};