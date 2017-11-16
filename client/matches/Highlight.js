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

export const HighlightList = (props) => (
    <List {...props} filter={{type: 1}}>
        <Datagrid>
            <TextField source="title" label="Highlight Title"/>
            <TextField source="description"/>
            <TextField source="url" label="URL"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const HighlightCreate = (props) => {
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="Information">
                    <TextInput source="title" label="Highlight Title" validate={[required]}/>
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


const HighlightTitle = ({record}) => {
    return <span>Highlight {record ? `"${record.title}"` : ''}</span>;
};
export const HighlightEdit = (props) => (
    <Edit title={<HighlightTitle/>} {...props}>
        <TabbedForm>
            <FormTab label="Information">
                <TextInput source="title" label="Highlight Title" validate={[required]}/>
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
