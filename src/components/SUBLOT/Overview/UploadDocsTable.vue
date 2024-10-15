<template>
<div class="q-px-xs table_wrapper">
 <q-table  :flat="flat_status" :bordered="bordered_status" class="main_table" :title="title" :row_per_page="row_per_page" :rows="rows"
  :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page"
  :row-key="row_key"
  @request="onRequest"
  :filter="filter"
  v-model:pagination="pagination"
  binary-state-sort
  flat
  @row-click="handleRowClick"
  >
  <!-- separator="none" -->

<!-- :loading="loading" -->
       <template v-slot:top-right v-if="top_button" >

            <q-btn v-if="top_button" v-on:click="header_button()" label="NEW"  dense flat ripple class="new_button q-py-none" style="background-color:#273655 !important; font-size: 13px;color:white; ">
                <!-- <q-tooltip>
                    Create
                </q-tooltip> -->
            </q-btn>
            <q-btn v-if="edit_button" v-on:click="edit_button()" label="EDIT"  dense flat ripple class="edit_button q-py-none" style="background-color:#ffff !important; font-size: 13px;color:black; border: 1px solid #ababab;">
                <!-- <q-tooltip>
                    Edit
                </q-tooltip> -->
            </q-btn>
           <q-btn v-if="delete_button" v-on:click="delete_button()"  label="Delete"  dense flat ripple class="delete_button q-py-none text-white" style="font-size: 13px;">
                <!-- <q-tooltip>
                    Delete
                </q-tooltip> -->
            </q-btn>


        </template>

      <!-- <template v-slot:body-cell-active="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="false"
            :no_label="true"
            v-model="props.row.active"
            :dbComponentBehavior="dbComponentBehavior.text" />

        </q-td>
    </template>

        <template v-slot:body-cell-ibt="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.ibt"
            :dbComponentBehavior="dbComponentBehavior.text"
             :true-value="1" :false-value="0"/>

        </q-td>
    </template>

      <template v-slot:body-cell-ict="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.ict"
            :dbComponentBehavior="dbComponentBehavior.text"
             :true-value="1" :false-value="0"/>

        </q-td>
    </template>

     <template v-slot:body-cell-gst="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.gst"
            :dbComponentBehavior="dbComponentBehavior.text"
             :true-value="1" :false-value="0"/>

        </q-td>
    </template>

      <template v-slot:body-cell-block_order="props">
        <q-td  class="col_width" :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.block_order"
            :dbComponentBehavior="dbComponentBehavior.text"
             :true-value="1" :false-value="0"/>

        </q-td>
    </template>

         <template v-slot:body-cell-block_return="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.block_return"
            :dbComponentBehavior="dbComponentBehavior.text"
             :true-value="1" :false-value="0"/>

        </q-td>
    </template> -->


<template v-slot:body="props">
        <q-tr @click="handleRowClick(props)" :class="[props.row.active_row ? `border-left` : ``]" :props="props"  :style="[`cursor: pointer;`,props.row.active_row ? `background-color: #D9EFF5;` : ``]">
          <!-- <q-td auto-width>
            <q-btn  size="sm" style="background-color:#58cf54;color:white;" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td> -->

          <template
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          >

          <q-td v-if="col.name == 'active'" :style="`text-align:${col.align}`">
            <Checkbox
                :disable="false"
                :no_label="true"
                v-model="props.row.active"
                :dbComponentBehavior="dbComponentBehavior.text" />
          </q-td>
          <q-td v-else-if="col.name == 'ibt'" :style="`text-align:${col.align}`">
            <Checkbox
                :disable="true"
                :no_label="true"
                v-model="props.row.ibt"
                :dbComponentBehavior="dbComponentBehavior.text"
                :true-value="1" :false-value="0"/>
          </q-td>
          <q-td v-else-if="col.name == 'ict'" :style="`text-align:${col.align}`">
            <Checkbox
                :disable="true"
                :no_label="true"
                v-model="props.row.ict"
                :dbComponentBehavior="dbComponentBehavior.text"
                :true-value="1" :false-value="0"/>
          </q-td>
           <q-td v-else-if="col.name == 'gst'" :style="`text-align:${col.align}`">
            <Checkbox
                :disable="true"
                :no_label="true"
                v-model="props.row.gst"
                :dbComponentBehavior="dbComponentBehavior.text"
                :true-value="1" :false-value="0"/>
          </q-td>
          <q-td v-else-if="col.name == 'block_order'" :style="`text-align:${col.align}`">
            <Checkbox
                :disable="true"
                :no_label="true"
                v-model="props.row.block_order"
                :dbComponentBehavior="dbComponentBehavior.text"
                :true-value="1" :false-value="0"/>
          </q-td>
          <q-td v-else-if="col.name == 'block_return'" :style="`text-align:${col.align}`">
            <Checkbox
                :disable="true"
                :no_label="true"
                v-model="props.row.block_return"
                :dbComponentBehavior="dbComponentBehavior.text"
                :true-value="1" :false-value="0"/>
          </q-td>

          <q-td v-else

            :style="[`text-align:${col.align}`, col.style, col.name == 'status_guid' ? `background-color:${props.row.status_color}` : '' ]"
          >
            {{col.value}}
          </q-td>
 <!-- :test="JSON.stringify(props)" -->
          </template>

        </q-tr>

      </template>
    <!-- block_return -->

     <!-- <template v-slot:pagination="scope">
         <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
      />
      </template> -->

  </q-table>

</div>


</template>

<script>
import Checkbox from 'src/components/SUBLOT/Base/Checkbox'

export default {
    data(){
      return{
        columns: this.table_column,
        rows: this.table_data,
        row_key: "",
        loading: false,
        filter:"",
        pagesNumber: "",
        pagination: {
          sortBy: '',
          descending: '',
          page: 1,
          // rowsPerPage: 5,
          rowsPerPage: this.row_per_page[0] === undefined ? this.row_per_page : this.row_per_page[0],
          rowsNumber: 0
        },

      }
    },
    props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status", 'action_button','edit_button', 'view_button', 'delete_button'
    ,"pass_row_key"],
    components: {
      Checkbox,
    },
    created() {
    },
    computed: {
      dbComponentBehavior() {
        return this.$store.getters['dbComponentBehavior/byLanguage']('sublot')
      },
      pagesNumber() {
       return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
      }
    },
    mounted(){
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    methods: {
        action : function(payload)
        {
            this.$emit('main_action', payload)
        },
        edit : function(payload)
        {
            this.$emit('main_edit', payload)
        },
        list : function(payload)
        {
            this.$emit('main_list', payload)
        },
        remove : function(payload)
        {
            this.$emit('main_delete', payload)
        },
        onRequest (props) {
          this.$emit("receiveRequestTable",props);

          this.pagination.sortBy = props.pagination.sortBy;
          this.pagination.descending = props.pagination.descending;
          this.pagination.page = props.pagination.page;
          this.pagination.rowsPerPage = props.pagination.rowsPerPage;
          this.loading = true
        },
         header_button : function(payload)
        {
            this.$emit('head_button', payload)
        },
         edit_button : function(payload)
        {
            this.$emit('edit_button', payload)
        },
          delete_button : function(payload)
        {
            this.$emit('delete_button', payload)
        },
         handleRowClick(payload)
      {
          payload.row.rowIndex = payload.rowIndex;
          this.$emit('receiveRowClick',payload.row)
      }

    },
    watch: {
        table_column(newVal)
        {
            this.columns = newVal;
            if(this.pass_row_key)
            {
                this.row_key = this.pass_row_key;
            }
            else
            {
                this.row_key = newVal[0].name;
            }

        },
        table_data(newVal){
            // this.rows = newVal;
            // this.loading = false;

            this.rows = newVal.data.results;
            this.pagination.rowsNumber = newVal.data.count;
            this.loading = false;
            // console.log(newVal)

        },
        columns_rows()
        {
            var _this = this;
            setTimeout(function(){
                _this.loading = false;
            },150);
        },
        forceLoading(newVal)
        {
            if(newVal)
            {
                this.loading = true;
            }
        }
    }
}
</script>

<style scoped>
.table_wrapper{
  padding-top: 15px;

}
.q-btn
{
    border-radius: 0px;
}

* >>> thead, *>>> th
{
    background-color: #dee1e6;
    padding: 10px 5px;
}

* >>> tr, * >>> td
{
    height: 25px !important;
}


*>>> tbody, * >>> td
 {
    padding: 0px 5px;
 }
* >>> .q-table__container
{
    padding: 0px 5px;
}

.new_button{
  width:60px;
  margin-left: 10px;
}
.edit_button {
  width:60px;
  margin-left: 10px;
}

.delete_button{
   width:60px;
   margin-left: 10px;
   background-color: #F71133;
}

* >>> .q-table__top {
    padding: 0px 0px;
    padding-bottom: 16px;
}

/* .text-brand{
  color:#273655 !important;
}

.bg-brand{
  background-color:#273655 !important;
} */

*>>> .q-checkbox__inner--truthy{
 color:#273655 !important;

}

*>>> .q-checkbox__inner{
  font-size: 35px;
  padding: 0px;
  margin: 0px;
}

*>>> .q-checkbox__bg {
  top: 8px;
  left:5px;
  height: 18px;
  width: 18px;
}

.col_width{
  max-width: 50px;
}



.button{
  background-color: #273655;
  color: white;
}

@media screen and (max-width: 280px) {
.new_button {
  width:60px;
  margin-right: 10px;
  margin-left: 0px;
}
.edit_button {
  width:60px;
  margin-left: 5px;
  margin-right: 5px;
}

.delete_button{
   width:60px;
   background-color: #F71133;
   margin-left: 10px;
}

}
</style>

<style scoped lang="sass">
 .border-left td:first-child
    /* bg color is important for td; just specify one */
    border-left: 5px solid #77BACC !important
    padding-left: 1px
</style>


