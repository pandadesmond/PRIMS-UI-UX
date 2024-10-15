<template>
<div class="row" style="margin:2px;">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
        <Label :text="json_container.label1" />
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 label_data">
        <Basiclabel style="word-break: break-word;" :text="json_container.label2 != '' ? json_container.label2 : '-'" />
    </div>
</div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
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
        Label,
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
    padding-left:5px;
}
</style>
