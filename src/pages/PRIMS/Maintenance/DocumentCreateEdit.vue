<template>
    <div class="row q-pa-md">
        <div class="text-subtitle1 header_text col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            Document
        </div>

        <q-form ref="save_form" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white q-my-sm q-pa-md">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="font-size: 10px;">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Code" v-model:pass_value="json.code" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelInput label="Name" v-model:pass_value="json.name" :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelSelect label="GL Code" v-model:pass_value="json.glcode_guid" :options="glcodeOptions"
                        :readonly="false" :dbComponentBehavior="dbComponentBehavior.text_required"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-sm q-py-xs">
                        <LabelEditor label="Remarks" v-model:pass_value="json.remarks" :readonly="false" :spellcheck="true"
                        :dbComponentBehavior="dbComponentBehavior.textarea"/>
                    </div>
                </div>
            </div>

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-py-md q-px-lg">
                <div class="row justify-end q-gutter-md">
                    <Button :pass_label="'Cancel'"
                        v-on:receiveClick="goBack"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_cancel_button"
                    />

                    <Button :pass_label="'Save'"
                        v-on:receiveClick="saveDoc"
                        :pass_no_caps="false"
                        :pass_square="true"
                        :pass_dense="true"
                        class="custom_button"
                    />
                </div>
            </div>
        </q-form>
    </div>

    <q-inner-loading
        :showing="loading"
        class="showLoading"
        color="primary"
    />
</template>

<script>
import LabelInput from 'src/components/PRIMS/General/LabelInput'
import LabelEditor from 'src/components/PRIMS/General/LabelEditor'
import LabelSelect from 'src/components/PRIMS/General/LabelSelect'
import Button from 'src/components/PRIMS/Main/Button'
import { Notify } from "quasar";

export default {
    components: {
        LabelInput,
        LabelEditor,
        LabelSelect,
        Button,
    },
    data(){
        return{
            page_function: "",
            json: {
                code: "",
                name: "",
                remarks: "",
                glcode_guid: "",
            },
            glcodeOptions: [],
            currentDoc: this.$route.query && this.$route.query.guid ? this.$route.query.guid : "",
            username: localStorage.getItem("username") != "" && localStorage.getItem("username") != "null" && localStorage.getItem("username") != null ? localStorage.getItem("username") : "",
            company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
            loading: false,
        }
    },
    computed: {
        dbComponentBehavior() {
            return this.$store.getters["dbComponentBehavior/byLanguage"]("tta");
        },
    },
    async mounted(){
        this.loading = true;

        // get glcode options
        var payload = {
            params: {
                "limit": 99999,
                "ordering": "code",
                "isactive": 1,
            }
        }

        var pass_obj = {
            "dispatch": 'general/trigger_get_glcode_list',
            "getter": 'general/get_glcode',
            "app": this,
            "payload": payload,
        }

        var glcode = await this.$dispatch(pass_obj);

        if(glcode.status)
        {
            var array_options = [];
            for(var i in glcode.response.data.results)
            {
                var obj = {
                    label: `${glcode.response.data.results[i].code} - ${glcode.response.data.results[i].name}`,
                    value: glcode.response.data.results[i].glcode_guid,
                }
                array_options.push(obj);
            }
            this.glcodeOptions = array_options;            
        }

        if(this.$route.name == 'editDocument')
        {
            this.page_function = "edit";

            if(this.currentDoc == "")
            {
                this.showNotify('negative', 'Unable to identify Document Guid.');
                this.$router.push({name: "document"});
            }

            var payload = {
                'document_guid': this.currentDoc,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_document',
                "getter": 'general/get_document',
                "app": this,
                "payload": payload,
            }

            var details = await this.$dispatch(pass_obj);
            // console.log(details)
            if(details.status)
            {
                this.json = details.response.data;
                this.json.isactive = this.json.isactive == 1 ? true : false;
            }
        }
        else if(this.$route.name == 'createDocument')
        {
            this.page_function = 'create';
        }

        this.loading = false;
    },
    methods:{
        async saveDoc(){
            this.loading = true;

            var error = await this.$refs.save_form.validate();

            if(!error)
            {
                this.showNotify('negative', 'Please make sure all field is correct.');
                this.loading = false;
                return;
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_document_list',
                "getter": 'general/get_document',
                "app": this,
                "payload": {
                    "params": {
                        "code": this.json.code,
                    }
                },
            };

            var list = await this.$dispatch(pass_obj);

            if(list.status)
            {
                var same_doc = list.response.data.results;
                if(this.page_function == 'edit')
                {
                    same_doc = same_doc.filter(entry=>entry.document_guid != this.json.document_guid);
                }
                
                if(same_doc.length>0)
                {
                    this.showNotify('negative', 'Document code must be unique');
                    this.loading = false;
                    return;
                }
            }

            var payload = {
                pass_json: {
                    "code": this.json.code,
                    "name": this.json.name,
                    "remarks": this.json.remarks,
                    "glcode_guid": this.json.glcode_guid,
                    "company_guid": this.company_guid,
                    "updated_by": this.username,
                }
            }

            if(this.page_function == 'create')
            {
                payload.pass_json.created_by = this.username;

                var pass_obj = {
                    "dispatch": 'general/trigger_create_document',
                    "getter": 'general/get_document',
                    "app": this,
                    "payload": payload,
                }

                var create_response = await this.$dispatch(pass_obj);

                if(create_response.status)
                {
                    this.showNotify('positive','Create successfully.');
                    this.$router.push({name: 'document'});
                }
                else
                {
                    this.showNotify('negative','Create fail.');
                    console.log('Create fail', create_response.response);
                }
            }
            else if(this.page_function == 'edit')
            {
                payload.document_guid = this.json.document_guid;

                var pass_obj = {
                    "dispatch": 'general/trigger_update_document',
                    "getter": 'general/get_document',
                    "app": this,
                    "payload": payload,
                }

                var update_response = await this.$dispatch(pass_obj);

                if(update_response.status)
                {
                    this.showNotify('positive','Update successfully.');
                    this.$router.push({name: 'document'});
                }
                else
                {
                    this.showNotify('negative','Update fail.');
                    console.log('Update fail', update_response.response);
                }
            }

            this.loading = false;
        },
        goBack(){
            this.$router.push({name: 'document'});
        },
        showNotify(type, message) 
        {
            if(type == "negative")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 99999999999,
                    position: 'top',
                    actions: [
                        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
                    ],
                    badgeStyle: "opacity: 0",
                })
            }

            if(type == "positive")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 1000,
                    position: 'top',
                    badgeStyle: "opacity: 0",

                })
            }

            if(type == "info")
            {
                    Notify.create({
                    type: type,
                    message: message,
                    timeout: 99999999,
                    position: 'top',
                    badgeStyle: "opacity: 0",
                    html: true,
                    actions: [
                        { label: 'OK', color: 'white', round: true, handler: () => { } }
                    ]
                })
            }
        },
    }
}
</script>

<style scoped>
.header_text
{
    padding-left: 0px;
    padding-right: 16px;
    font-weight: 500;
    font-size: 14px;
    /* font-family: InterfontSemiBold; */

}

.custom_cancel_button
{
    font-size: 14px;
    padding: 5px;
    min-width: 100px;
}

.custom_button
{
    font-size: 14px;
    background-color: #273655;
    color: white;
    padding: 5px;
    min-width: 100px;
}

.showLoading
{
  z-index: 3;
}

* >>> .q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}


* >>> input[type="text"]
{
    font-size: 12px;
}

* >>> .q-field__control
{
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 0px;
    padding-bottom: 0px;
}

* >>> .custom_tab_font > .q-tab__label
{
    font-size: 12px;
    overflow: hidden;
}

.q-textarea >>>.q-field__control {
    min-height: 81px !important;
}
</style>
