import React from 'react';
import {
    Create,
    Edit,
    List,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    NumberInput,
    LongTextInput,
    ReferenceField,
    ReferenceManyField,
    ReferenceInput,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    SelectInput,
    ImageInput,
    ImageField,
    FormTab,
    TabbedForm,
    NullableBooleanInput,
    BooleanInput,
    BooleanField
} from 'admin-on-rest';

import {required, minValue, maxValue} from 'admin-on-rest';

export const FullMatchList = (props) => (
    <List {...props} filter={{type: 0}}>
        <Datagrid>
            <TextField source="title" label="Full Match Title"/>
            <TextField source="description"/>
            <TextField source="url" label="URL"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const choices = [
    {id: '0', name: 'unpublished'},
    {id: '1', name: 'published'}
]
export const FullMatchCreate = (props) => {
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="Information">
                    <TextInput source="title" label="Full Match Title" validate={[required]}/>
                    <TextInput source="description" validate={[required]}/>
                    <TextInput source="url" validate={[required]}/>
                    <TextInput source="coverPhoto" />
                </FormTab>

                <FormTab label="Cover Photo">
                    <ImageInput source="file" label="Cover Photo" accept="image/*">
                        <ImageField source="src" title="title"/>
                    </ImageInput>
                </FormTab>
            </TabbedForm>
        </Create>
    );
};


const FullMatchTitle = ({record}) => {
    return <span>FullMatch {record ? `"${record.title}"` : ''}</span>;
};
export const FullMatchEdit = (props) => (
    <Edit title={<FullMatchTitle/>} {...props}>
        <TabbedForm>
            <FormTab label="Information">
                <TextInput source="title" label="Full Match Title" validate={[required]}/>
                <TextInput source="description" validate={[required]}/>
                <TextInput source="url" validate={[required]}/>
                <TextInput source="coverPhoto" />

            </FormTab>
            <FormTab label="Cover Photo">
                <ImageField source='coverPhoto' title='title'/>
                <ImageInput source="file" label="Cover Photo" accept="image/*">
                    <ImageField source="src" title="title"/>
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);
