<template>
<q-table
:rows="rows"
>
    <template v-slot:header>
      <q-tr>
        <q-th 
            v-for="(column, index) in columns" 
            :key="index" 
            :draggable="true"
            @dragstart="dragStartColumn(index)" 
            @dragover.prevent="dragOverColumn(index)"
            @drop.prevent="dropColumn(index)" 
            @touchstart="touchStartColumn(index)"
            @touchmove.prevent="touchMoveColumn(index)" 
            @touchend="touchEndColumn(index)"
            :class="{ 'drop-target': index === dropColumnIndex }">
          {{ column.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr 
        v-for="(cell, cellIndex) in [props.row]" 
        :key="cellIndex" 
        :draggable="true"
        @dragstart="dragStartRow(props.rowIndex)" 
        @dragover.prevent="dragOverRow(props.rowIndex)"
        @drop.prevent="dropRow(props.rowIndex)" 
        @touchstart="touchStartRow(props.rowIndex)"
        @touchmove.prevent="touchMoveRow(props.rowIndex)"
        @touchend="touchEndRow(props.rowIndex)"
        :class="{ 'dragging': props.rowIndex === dragRowIndex }">

        <q-td 
            v-for="(value, valueIndex) in cell" 
            :key="valueIndex">
            {{ value }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

  <script>
  export default {
    data() {
      return {
        columns: [],
        rows: [],
        dragRowIndex: null,
        dragColumnIndex: null,
        dropRowIndex: null,
        dropColumnIndex: null,
      };
    },
    props:[
      'columns',
      'rows'
    ],
    methods:{
    // desktop columns

     dragStartColumn(index) {
      this.$emit('desktop_start_column', index)
     },
     dragOverColumn(index) {
      this.$emit('desktop_over_column', index)
     },
     dropColumn(index) {
      this.$emit('desktop_drop_column', index)
     },

    //desktop rows
    dragStartRow(index) {
      this.$emit('desktop_start_row', index)
    },
    dragOverRow(index) {
      this.$emit('desktop_over_row', index)
    },
    dropRow(index) {
      this.$emit('desktop_drop_row', index)
    },

    // mobile columns
    touchStartColumn(index) {
      this.$emit('mobile_start_column', index)
    },
    touchMoveColumn(index) {
      this.$emit('mobile_over_column', index)
    },
    touchEndColumn(index) {
      this.$emit('mobile_drop_column', index)
    },

    // mobile rows
    touchStartRow(rowIndex) {
      this.$emit('mobile_start_row', rowIndex)
    },
    touchMoveRow(rowIndex) {
      this.$emit('mobile_over_row', rowIndex)
    },
    touchEndRow(rowIndex) {
      this.$emit('mobile_drop_row', rowIndex)
    },

    },
    watch: {
      columns(newVal){
        this.columns = newVal
        console.log('this.columns',this.columns)
      },
      rows(newVal){
        this.rows = newVal
        console.log('this.rows', this.rows)
      }
    },
  };
  </script>
  

  