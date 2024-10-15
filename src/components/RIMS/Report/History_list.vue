<template>
<div class="row" style="margin-left:10px;margin-bottom: 10px;">
    <div class="col-xs-2">
        <Basiclabel text="1" />
    </div>
    <div class="col-xs-4">
        <Basiclabel :text="json_container.status_description" />
    </div>
    <div class="col-xs-3">
        <Basiclabel :text="json_container.created_by" />
    </div>
    <div class="col-xs-3">
        <Basiclabel :text="json_container.created_at" />
    </div>
</div>
</template>

<script>
// import Label from 'src/components/RIMS/Base/Label';
import Basiclabel from 'src/components/Base/Label';
// import Input from 'src/components/RIMS/Base/Input';

export default {
    name: "Label_input",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json'],
    computed: {},
    components: {
        // Label,
        Basiclabel
    },
    methods: {

    },
    watch: {

    }
}
</script>

<style scoped>
.label_title {
    min-width:105px;
}

.label_data {
    margin-left:5px;
}
</style>
