<template>
<b-row class="mb-2">
    <b-col sm="3" class="text-sm-right"><b>{{ title }}:</b></b-col>
    <b-col>{{ listString }}</b-col>
</b-row>
</template>

<script>
export default {
    props: {
        title: String,
        items: Array
    },
    methods: {
        formatList() {

        }
    },
    computed: {
        listString: function () {
            var ret = ''
            this.items.forEach(item => {
                ret += item.name + ', '

            });
            if (ret.length > 2) {
                ret = ret.substr(0, ret.length - 2)
            }
            return ret
        }
    }
}
</script>

<style>

</style>
