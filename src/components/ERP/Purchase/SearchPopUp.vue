<template>
  <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
    <q-card-section class="row header_top_mobile">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
        <div class="text-subtitle1 header_text" style="margin-top: 5px;">{{ title }}<br></div>
      </div>
      <div class="custom_close_button">
        <q-btn icon="close" flat round dense @click="closeDialog()" :disable="false"/>
      </div>
    </q-card-section>

    <q-card-section class="upload_container content_body_dialog">
        <div class="row upload_separator_first">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="row input_wrapper_right">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <span class="mobile_font">Search Method</span>
                  </div>
                  <div class="col-xs-4 col-sm-5 col-md-4 col-lg-4 col-xl-4 q-pr-sm">
                    <Select
                    :readonly="false"
                    :no_label="true"
                    v-model="search.type"
                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.search_method : oridbComponentBehavior.select"
                    :options="search.options"
                    v-on:receiveChange="handleChangeType"
                    />
                  </div>

                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <Input
                    :autofocusclick="true"
                    :no_label="true"
                    :readonly="false"
                    placeholder="Search"
                    v-on:change="handleChange"
                    v-on:handlekeyup="handleEnterKey"
                    v-model="search.value"
                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                  </div>

                  <div dir="rtl" class="button_upload_wrapper col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2">
                    <Button_icon :small_round="true" :flat="false" :font_color="'white'" :color="'primary'" :icon="'search'" :outline="false" size="13px"
                    v-on:receiveClick="showTable()" style="margin-top: 2px;"/>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

              <div v-if="search.showTable" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row dialog_separator">
                  <ItemTable
                  :forceLoading="forceLoading"
                  v-on:onRowClick="rowClick"
                  :row_per_page="row_per_page"
                  :top_button="top_button"
                  v-on:add_button="onAdd"
                  v-on:main_action="onAction"
                  v-on:main_edit="onEdit"
                  v-on:main_list="onList"
                  v-on:main_delete="onDelete"
                  :title="table_title"
                  :table_data="table_data"
                  :table_column="table_column"
                  :action_button="action_button"
                  :edit_button="edit_button"
                  :view_button="view_button"
                  :delete_button="delete_button"
                  :flat_status="flat_status"
                  :bordered_status="bordered_status"
                  v-on:receiveRequestTable="receiveRequest"
                  style="padding: 0px; width: 100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </q-card-section>

    <q-card-actions v-if="select_row" class="dialog_action" style="padding-left: 20px;">
        <Button_icon class="full-width" style="height: 30px;" :small_round="true" :readonly="false" :flat="false" :font_color="'white'" :color="'primary '" :text="'ADD ' + title.toUpperCase()" :outline="false" size="13px" @click="handleClickModify()"/>
    </q-card-actions>

    <q-inner-loading
      :showing="showAddLoading"
      color="primary"
    />
  </q-card>

  <q-card v-else style="width: 1200px; max-width: 98vw; margin-top: 5%;">
    <q-card-section class=" row theme_color header_top_mobile dialog_header" style="padding: 0px;">
        <div class="text-subtitle1 header_text" style="margin-top: 5px;">{{ title }}<br></div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog()" :disable="false"/>
    </q-card-section>

    <q-card-section class="upload_container content_body_dialog">
      <div class="row upload_separator_first">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="row input_wrapper_right">
            <div class="offset-sm-2 offset-md-3 col-xs-12 col-sm-8 col-md-6 col-lg-6 col-xl-6">
              <div class="row" style="padding-top: 15px; padding-bottom: 8px;">
                <div class="col-xs-4 col-sm-5 col-md-4 col-lg-4 col-xl-4 q-pr-sm">
                  <Select
                  :readonly="false"
                  :no_label="false"
                  v-model="search.type"
                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.search_method : oridbComponentBehavior.select"
                  :options="search.options"
                  v-on:receiveChange="handleChangeType"
                  />
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <Input
                  :autofocusclick="true"
                  :no_label="false"
                  label="Search"
                  :readonly="false"
                  v-on:change="handleChange"
                  v-on:handlekeyup="handleEnterKey"
                  v-model="search.value"
                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                </div>

                <div dir="rtl" class="button_upload_wrapper col-xs-2 col-sm-1 col-md-2 col-lg-2 col-xl-2">
                  <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :icon="'search'" :outline="false" size="13px"
                  v-on:receiveClick="showTable()" style="margin-top: -2px;"/>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

            <div v-if="search.showTable" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row dialog_separator">
                <ItemTable
                :forceLoading="forceLoading"
                v-on:onRowClick="rowClick"
                :row_per_page="row_per_page"
                :top_button="top_button"
                v-on:add_button="onAdd"
                v-on:main_action="onAction"
                v-on:main_edit="onEdit"
                v-on:main_list="onList"
                v-on:main_delete="onDelete"
                :title="table_title"
                :table_data="table_data"
                :table_column="table_column"
                :action_button="action_button"
                :edit_button="edit_button"
                :view_button="view_button"
                :delete_button="delete_button"
                :flat_status="flat_status"
                :bordered_status="bordered_status"
                v-on:receiveRequestTable="receiveRequest"
                style="padding: 0px; width: 100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions v-if="select_row" class="dialog_action" style="padding-left: 20px;">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" dir="rtl">
          <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#094161 '" :text="'ADD ' + title.toUpperCase()" :outline="false" size="15px" @click="handleClickModify()"/>
        </div>
    </q-card-actions>

    <q-inner-loading
      :showing="showAddLoading"
      color="primary"
    />
  </q-card>
</template>

<script>
import Input from 'src/components/ERP/Base/Input'
import Select from 'src/components/ERP/Base/Select'
import Button_icon from 'src/components/ERP/Base/Button_icon'
import ItemTable from 'src/components/ERP/Purchase/ItemTable'

export default {
    data(){
      return{
        search: this.pass_value,
      }
    },
    props: ['title', 'pass_value', 'forceLoading','row_per_page','top_button',
    'table_title','table_data','table_column','action_button','edit_button',
    'view_button','delete_button','flat_status','bordered_status','select_row','showAddLoading'],
    components: {
      Select,
      Input,
      Button_icon,
      ItemTable,
    },
    mounted(){
    },
    created() {
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
      },
    },
    methods: {
        handleClickModify()
        {
          this.$emit('onClickModify')
        },
        showTable()
        {
          this.$emit('show_table')
        },
        async rowClick(payload)
        {
          this.$emit('onRowClick', payload);
        },
        handleEnterKey(event)
        {
          if (event.key === "Enter") {
            this.showTable();
          }
        },
        onAdd: function(payload)
        {
            this.$emit('add_button', payload)
        },
        onAction: function(payload)
        {
            this.$emit('main_action', payload)
        },
        onEdit: function(payload)
        {
            this.$emit('main_edit', payload)
        },
        onList: function(payload)
        {
            this.$emit('main_list', payload)
        },
        onDelete: function(payload)
        {
            this.$emit('main_delete', payload)
        },
        receiveRequest: function(payload)
        {
            this.$emit('receive_request_table', payload)
        },
        closeDialog()
        {
          this.$emit('onCloseDialog')
        },
    },
    watch:{
    }
}
</script>

<style scoped>
.header_top_mobile
{
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.header_text
{
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
}
.custom_close_button
{
  color: #928f8f;
  position: absolute;
  padding: 0;
  padding-left: 10px;
  top: 1px;
  right: 12px; /* Adjust the desired distance from the right */
  z-index: 1;
}
.upload_container
{
    padding: 10px;
    padding-top: 0px;
}

/* .content_body_dialog
{
    height: 80vh;
    overflow-y: scroll;
} */
.upload_separator_first
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-top: 0px;
    padding-bottom: 10px;
}
.input_wrapper_right
{
  padding-right: 1%;
}
.dialog_separator
{
  padding-top: 5px;
}

.dialog_action
{
  height: 55px;
  position: sticky;
  padding:0px;
  padding-right: 20px;
  padding-left: 20px;
  bottom: 0px;
  background-color: white;
}
</style>

