<template>
<div class="expand_table_wrapper" style="position:relative;">
    <span>
      <q-hierarchy id="test" :columns="columns" :data="table_data" >
          <template v-slot:body="props">
            <td data-th="Name">
              <div v-bind:style="props.setPadding(props.item)"
                   :class="props.iconName(props.item)!='done'?'q-pl-lg':''">
                <q-btn @click="props.toggle(props.item)" v-if="props.iconName(props.item)!='done'"
                       :icon="props.iconName(props.item)" flat
                       dense>
                </q-btn>
                <span class="q-ml-sm">{{ props.item.Div }}</span>
              </div>
            </td>
            <!-- <td :class="props.item.Online < 0 ? 'font_red text-right': 'text-right'">
              <div v-if="(props.item.Offline <= 0) || (props.item.Offline >= 0) ">
                {{ this.$plugins_formatAmount(props.item.Offline,'%') }}
              </div>
              <div v-if="(props.item.TotalSales <= 0) || (props.item.TotalSales >= 0)">
                {{ this.$plugins_formatAmount(props.item.TotalSales,'$') }}
              </div>
            </td>
            <td  :class="props.item.Online < 0 ? 'font_red text-right': 'text-right'">
              <div v-if="(props.item.Online <= 0) || (props.item.Online >= 0)">
                {{ this.$plugins_formatAmount(props.item.Online,'%') }}
              </div>
              <div v-if="(props.item.SalesContribution <= 0) || (props.item.SalesContribution >= 0)">
                {{ this.$plugins_formatAmount(props.item.SalesContribution,'%') }}
              </div>
            </td> -->
            <td :class="props.item.ESTORE < 0 ? 'font_red text-right': 'text-right'">
              <div v-if="(props.item.ESTORE <= 0) || (props.item.ESTORE >= 0) ">
                {{ this.$plugins_formatAmount(props.item.ESTORE,'%') }}
              </div>
              <div v-if="(props.item.TotalSales <= 0) || (props.item.TotalSales >= 0)">
                {{ this.$plugins_formatAmount(props.item.TotalSales,'$') }}
              </div>
            </td>
            <td  :class="props.item.POS < 0 ? 'font_red text-right': 'text-right'">
              <div v-if="(props.item.POS <= 0) || (props.item.POS >= 0)">
                {{ this.$plugins_formatAmount(props.item.POS,'%') }}
              </div>
              <div v-if="(props.item.SalesContribution <= 0) || (props.item.SalesContribution >= 0)">
                {{ this.$plugins_formatAmount(props.item.SalesContribution,'%') }}
              </div>
            </td>
            <td v-if="(props.item.SI <= 0) || (props.item.SI >= 0)"  :class="props.item.SI < 0 ? 'font_red text-right': 'text-right'">
              <div v-if="(props.item.SI <= 0) || (props.item.SI >= 0)">
                {{ this.$plugins_formatAmount(props.item.SI,'%') }}
              </div>
            </td>
          </template>
        </q-hierarchy>
    </span>
        <Loading :loading="loading" />
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import Loading from 'src/components/Base/Loading';

export default defineComponent({
  name: "CustomHierarchy",
  data() {
    return {
      loading: true,
      table_data:this.data,
    }
  },
  props: ['columns','data', 'forceLoading'],
  components: {
    Loading
  },
  computed: {
    columns_rows() {
      return [this.columns && this.table_data];
    },
  },
  watch:{
      data(newVal){
        this.table_data = newVal;
        this.loading = false;
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
})
</script>

<style scoped>
.table_footer
{
  font-weight: bold;
  background-color: #ededed;
}

* >>> table > tbody > tr:last-child 
{ 
  font-weight: bold; 
}
</style>