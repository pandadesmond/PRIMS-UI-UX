<template>
<div class="q-px-sm table_wrapper">
 <q-table separator="cell" :flat="flat_status" :bordered="bordered_status" class="main_table" :title="title" :row_per_page="row_per_page" :rows="rows"
  :columns="columns" rows-per-page-label="Entries" :pagination-label="getPaginationLabel" :rows-per-page-options="row_per_page"
  :row-key="row_key"
  @request="onRequest"
  :filter="filter"
  v-model:pagination="pagination"
  binary-state-sort
  @row-click="onRowClick"
  :loading="loading"
  >

       <template v-slot:top-right v-if="top_button" >

            <q-btn v-if="top_button" v-on:click="header_button()" label="NEW"  dense ripple class="q-py-none top_button" style="background-color:#273655 !important; font-size: 15px;color:white;">
                <!-- <q-tooltip>
                    Create
                </q-tooltip> -->
            </q-btn>

        </template>

        <template v-slot:body-cell-action="props">
        <q-td>

            <q-btn icon="edit_note"  dense :outline="button_no_outline" ripple class="q-mr-sm button" v-on:click="edit(props.row)"
            v-if="edit_button" @click.stop="btnclick">
                <q-tooltip>
                    Edit
                </q-tooltip>
            </q-btn>

            <q-btn icon="view_list" color="positive" dense :outline="button_no_outline" ripple class="q-mr-sm" v-on:click="list(props.row)"
            v-if="view_button">
                <q-tooltip>
                    View
                </q-tooltip>
            </q-btn>
            <q-btn icon="delete"  :disabled="readonly_button" dense color="negative" :outline="button_no_outline" ripple class="button" v-on:click="remove(props.row)"
               v-if="delete_button" @click.stop="btnclick">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn>
            <!-- <q-btn icon="delete" color="negative" dense :outline="button_no_outline" ripple class="q-mr-none" v-on:click="delete(props.row)"
            v-if="delete_button">
                <q-tooltip>
                    Delete
                </q-tooltip>
            </q-btn> -->
        </q-td>
    </template>

      <template v-slot:body-cell-isactive="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.isactive"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="1"
            :false-value="0"
            />
        </q-td>
    </template>

    <template v-slot:body-cell-ispromo="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.ispromo"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="1"
            :false-value="0"
            />
        </q-td>
    </template>

      <template v-slot:body-cell-setactive="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.setactive"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="1"
            :false-value="0"
            />
        </q-td>
    </template>

    <template v-slot:body-cell-one_off="props">
        <q-td :style="`text-align:${props.col.align}`">
          <Checkbox
            :disable="true"
            :no_label="true"
            v-model="props.row.one_off"
            :dbComponentBehavior="dbComponentBehavior.text"
            :true-value="1"
            :false-value="0"
            />
        </q-td>
    </template>

    <template v-slot:body-cell-amount="props">
        <q-td :style="`text-align:${props.col.align}`">
          {{formatAmount(props.row.amount,'$',2)}}
        </q-td>
    </template>
  </q-table>

</div>


</template>

<script>
import Button_icon from 'src/components/SUBLOT/Base/Button_icon'
import Checkbox from 'src/components/SUBLOT/Base/Checkbox'
import Toggle from 'src/components/SUBLOT/Base/Toggle'

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
    props: ['title', 'table_column', 'table_data','top_button', 'hide_footer', 'row_per_page','table_footer',"flat_status", "bordered_status",'edit_button', 'view_button', 'delete_button'
    ,"pass_row_key"],
    components: {
      Button_icon,
      Checkbox,
      Toggle
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
      formatAmount(value, type, xdecimal = "not_declare")
      {
          var ori_value = value;

          //capture  1,234 or 123.00 or 1,234.00 or 1,234.00 or 1,234,567.00 or 1,234,567
          // const containsOnlyNumbers = str => /^(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/.test(str);
          // const containsOnlyNumbers = str => /^(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2}|\.\d+)?$/g.test(str);
          // const containsOnlyNumbers = str => /^(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2})?$/.test(str);//cannot detect decimal
          // const containsOnlyNumbers = str => /^-?(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2})?$/.test(str);//can detect negative
          const containsOnlyNumbers = str => /^-?(\d{1,3}(,\d{3})*|\d+)(\.\d+)?$/.test(str);//can detect negative and all decimal

          // alert('until checking amount, when click string on table cannot show value yet. save function dont have yet because need emit parent and parent save and hide popup. Waiting jimmy give utility name and need control one lot can only one type of each');
          var is_number = containsOnlyNumbers(value);

          if(is_number)
          {
          
            var amount_type = this.amount_type;

            if(type == "%")
            {
                // console.log('divide 1000');
                var decimal = xdecimal == "not_declare" ? 1 : xdecimal;
                var value = Number(value)/1000;
            }
            else
            {
                // console.log('no divide');
                var decimal = xdecimal == "not_declare" ? 0 : xdecimal;
                var value = Number(value);
            }

            if(type == "$")
            {
                var value = Number(value).toFixed(decimal);
            }
            else if(type == "%")
            {
                var value = Number(ori_value).toFixed(1);//curent change to value always decimal 1 for percent
            }
            else
            {
                var value = value;
            }
            
            var parts = value.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];
            const thousands = /\B(?=(\d{3})+(?!\d))/g;

            return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
          }
          else
          {
            return value;
          }

      },
         btnclick()
        {

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
      //    handleRowClick(payload)
      // {
      //     payload.row.rowIndex = payload.rowIndex;
      //     this.$emit('receiveRowClick',payload.row)
      // }
        onRowClick : function (event, row, index)
        {
          // console.log(event);
          // console.log(row);
          // console.log(index);
          this.$emit('onRowClick', row)
        },

    },
    watch: {
        table_column(newVal)
        {
            this.columns = newVal;
            // if(this.pass_row_key)
            // {
            //     this.row_key = this.pass_row_key;
            // }
            // else
            // {
            //     this.row_key = newVal[0].name;
            // }

        },
        table_data(newVal){
            // this.rows = newVal;
            // this.loading = false;

            this.rows = newVal.data.results;
            this.pagination.rowsNumber = newVal.data.count;
            this.loading = false;
            // if(this.force_loading == false)
            // {
            //   this.loading = false;
            // }

        },
        // columns_rows()
        // {
        //     var _this = this;
        //     setTimeout(function(){
        //         _this.loading = false;
        //     },150);
        // },
        // forceLoading(newVal)
        // {
        //     if(newVal)
        //     {
        //         this.loading = true;
        //     }
        // }
    }
}
</script>

<style scoped>
.table_wrapper{
  padding-top: 2px;
}

.q-btn
{
    border-radius: 0px;
}

* >>> thead
{
    background-color: #dee1e6;
}

* >>> tr, * >>> td
{
    height: 35px !important;
}

* >>> .q-table__container
{
    padding: 10px;
    border-radius: 0px;
}

.top_button {
  width:65px;
}

* >>> .q-table__top {
  padding: 0px 0px;
  padding-bottom: 15px;

}

.button{
  background-color: #273655;
  color: white;
}

tr td:first-child{
  width: 80px;
}

*>>> .q-checkbox__inner--truthy{
 color:#273655 !important;
}
</style>

