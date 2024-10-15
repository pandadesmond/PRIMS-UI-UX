<template>
    <q-input :label="componentBehavior.label" dense bg-color="white" v-on:change="handleChange" filled v-model="displayDateRange" :rules="componentBehavior.rules">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
            <!-- <q-date @update:model-value="handleChange" mask="YYYY-MM-DD" range minimal v-model='date'/> -->
            <q-date @update:model-value="handleChange" mask="YYYY-MM-DD" v-model="date" range minimal />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

</template>

<script>

export default {
    data () {
        return {
            date: this.daterange,
        }
    },
    props:['daterange','componentBehavior','autoclose'],
    methods: {
        handleChange(newVal) {
            this.$emit('receiveChange', newVal)
            
            if(this.autoclose)
            {
              this.$refs.qDateProxy.hide();
            }
        },
    },
    computed:{
        displayDateRange()
        {
            var return_message = '';
            if(this.date != undefined && this.date != '')
            {
                var from = this.date.from;
                var to = this.date.to;
                var return_message = from+" - "+to;
            }
            
            return return_message;
        }
    }
}
</script>
