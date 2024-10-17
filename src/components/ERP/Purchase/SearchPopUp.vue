<template>
  <q-card v-if="$q.screen.width < 600" style="width: 700px; max-width: 98vw; margin-top: 5%;">
    <q-card-section class="row header_top_mobile">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="text-subtitle1 mobile_dialog_bottom" style="padding:16px 24px;margin-top: 0px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">{{ title }}<br></div>
      </div>
      <div class="custom_close_button">
        <q-btn icon="close" flat round dense @click="closeDialog()" :disable="false"/>
      </div>
    </q-card-section>

    <q-card-section class="upload_container content_body_dialog" style="padding:16px">
        <div class="row "><!--upload_separator_first-->
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="row input_wrapper_right">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row col-12">
                  <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <span class="mobile_font">Search Method</span>
                  </div> -->
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 q-pr-md">
                    <Select
                    :readonly="false"
                    :no_label="false"
                    :label="'Search Method'"
                    v-model="search.type"
                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.search_method : oridbComponentBehavior.select"
                    :options="search.options"
                    v-on:receiveChange="handleChangeType"
                    />
                  </div>
<!-- placeholder="Search" -->
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 q-pr-md">
                    <Input
                    :autofocusclick="true"
                    :no_label="false"
                    
                    :readonly="false"
                    label="Search"
                    v-on:change="handleChange"
                    v-on:handlekeyup="handleEnterKey"
                    v-model="search.value"
                    :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                  </div>

                  <div class="button_upload_wrapper col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <Button_icon :small_round="true" :flat="false" :font_color="'rgb(9, 65, 97)'" :color="'white'" :icon="'search'" :outline="true" size="13px"
                    v-on:receiveClick="showTable()" style="margin-top: 0px;height:100%" class="button-padding full-width"/>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>

              <div v-if="search.showTable" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row q-pt-md">
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
        <Button_icon class="full-width" style="height: 30px;" :small_round="true" :readonly="false" :flat="false" :font_color="'white'" :color="'#1E90FF'" :text="'ADD ' + title.toUpperCase()" :outline="false" size="13px" @click="handleClickModify()"/>
    </q-card-actions>

    <q-inner-loading
      :showing="showAddLoading"
      color="primary"
    />
  </q-card>

  <q-card v-else style="width: 900px; max-width: 98vw; text-align:center;margin-top: 5%; border-radius:8px;">
    <q-card-section class=" row theme_color header_top_mobile dialog_header" style="height: 56px; padding: 8px 24px;">
        <div class="text-subtitle1 header_text" style="margin-top: 10px;margin-left: 10px">{{ title }}<br></div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog()" :disable="false"/>
    </q-card-section>

    <q-card-section class="upload_container content_body_dialog">
      <div class="row" style="padding: 16px">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="row input_wrapper_right">
            <!-- <div class="bg-yellow offset-sm-2 offset-md-3 col-xs-12 col-sm-8 col-md-6 col-lg-6 col-xl-6"> -->
              <div class="row col-12">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <Select
                  :readonly="false"
                  :no_label="false"
                  v-model="search.type"
                  :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.search_method : oridbComponentBehavior.select"
                  :options="search.options"
                  v-on:receiveChange="handleChangeType"
                  :outline="true"
                  />
                </div>

                <div class="row col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 q-pl-sm" style="height: 100%;">
                  <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 q-pr-sm q-pl-sm">
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

                <!-- <div dir="rtl" class="bg-blue button_upload_wrapper col-xs-12 col-sm-1 col-md-2 col-lg-2 col-xl-2"> -->
                  <!-- <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :icon="'search'" :outline="false" size="13px"
                  v-on:receiveClick="showTable()" style="margin-top: -2px;"/> -->
                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 q-pl-sm">
                  <Button_icon dir="rtl" :flat="false" :font_color="'rgb(9, 65, 97)'" :color="'white'"  :outline="true" size="13px"
                    v-on:receiveClick="showTable()" :icon="'search'" style="height:100%;" class="button-padding full-width"
                    :class="{ 'expanded': isHovered, 'clicked': isClicked }" @mouseover="isHovered = true"  @mouseleave="isHovered = false" @click="handleClick"/>
                  </div>
                  </div>
                  <!-- </div> -->
              </div>
            <!-- </div> -->

            <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div> -->

            <div v-if="search.showTable" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row" style="padding-top: 16px">
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
          <Button_icon :readonly="false" :flat="true" :font_color="'white'" :color="'#1E90FF'" :text="'ADD ' + title.toUpperCase()" :outline="false" size="16px" @click="handleClickModify()"
          class="custom_primary_button"/>
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
        isHovered: false,
        isClicked: false,
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
@media screen and (max-width: 599px) {
  *[data-v-05d8aed3] >>> .q-field__label
{
  top: 7px;  /*at here change the label top */
  /* background-color: #1E90FF; */
  color: #72777A;
  /* background-color: antiquewhite; */
  /* padding-top: 25px !important; label inner */
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
}
*>>>.q-card__section--vert {
    padding: 0px;
}
.header_top_mobile
{
  /* text-align: center; */
  /* padding-left: 10px; */
  /* padding-right: 10px; */
  padding-top: 0px;
  padding-bottom: 0px;
}
.header_text
{
  padding-left: 16px;
  padding-right: 16px;
  font-weight: 600;
  font-size: 20px;
  font-family: InterfontSemiBold;

}
.custom_close_button
{
  color: #928f8f;
  position: absolute;
  padding: 0;
  padding-left: 10px;
  top: 12px;
  right: 12px; /* Adjust the desired distance from the right */
  z-index: 1;
}
.upload_container
{
    padding: 10px;
    padding-top: 10px;
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
    padding-top: 10px;
    padding-bottom: 10px;
}
.input_wrapper_right
{
  /* padding-right: 5%; */
  /* background-color: brown; */
  align-content: center;
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
.button-padding {
  /* padding: 16px 16px; */
  /* border-radius: 8px; */
  /* border: 2px solid #1E90FF; */
}
.search-button .q-icon {
  transition: transform 0.3s ease;
}

.search-button.expanded .q-icon {
  transform: scale(1.1); /* This will scale the icon from 20px to 22px assuming 1.1 times the original size */
}
* >>>.q-btn .q-icon {
    font-size: 1.88em;
}
*>>>.q-field__native {
    
    /* padding: 16px 16px var(--Variant-2, 16px) 16px; */
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    font-family: InterfontMedium;
    /* background-color: #C10015; */
}
@media screen and (min-width: 600px) {
*[data-v-05d8aed3] >>> .q-field__label
{
  top: 11px;  /*at here change the label top */
  /* background-color: #1E90FF; */
  color: #72777A;
  /* background-color: antiquewhite; */
  /* padding-top: 25px !important; label inner */
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
}
}
*>>>.q-select__dropdown-icon {
  /* padding-top: 16px; */
  /* background-color: aquamarine; */
  font-size: 1.3750em; /*is 22px */
  justify-content: center;
  align-items: center;
}
/* .theme_color {
    background-color: #1E90FF !important;
    color: white;
} */
.q-dialog__inner--right:not(.q-dialog__inner--animating) > div, .q-dialog__inner--top:not(.q-dialog__inner--animating) > div {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}
*>>>.q-field--auto-height.q-field--labeled .q-field__native, .q-field--auto-height.q-field--labeled .q-field__prefix, .q-field--auto-height.q-field--labeled .q-field__suffix {
    /* padding-top: 0; */
}
*>>>.q-field--labeled.q-field--dense .q-field__native, .q-field--labeled.q-field--dense .q-field__prefix, .q-field--labeled.q-field--dense .q-field__suffix {
    /* padding-top: 20px; */
    padding-bottom: 2px;
}
.custom_primary_button {
  padding: 10px 30px;
  border-radius: 8px;
  box-shadow: 0px 1px 3.6px 0px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-family: InterfontBold;
  width: 200px;
  height: 50px;
}
.mobile_dialog_bottom {
  font-family: InterfontSemiBold;
  font-size: 16px;
  font-weight: 600;
}
</style>

