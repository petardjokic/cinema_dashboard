<template>
<div>
    <b-form-select v-model=currentSelected :options=options></b-form-select>
    <b-button :disabled="!currentSelected" @click=addItem>Add</b-button>
    <hr />
    <b-table small :fields=outputTableFields :items=output responsive>
        <template v-slot:cell(selected)="row">
            {{ row.item.name }}
        </template>
        <template v-slot:cell(remove)="row">
            <b-button size="sm" variant='danger' @click=removeItem(row.item)>
                <b-icon icon="trash"></b-icon>
            </b-button>
        </template>
    </b-table>
    <b-button block @click=sendList>OK</b-button>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentSelected: null,
            outputTableFields: ['selected', 'remove'],
            deletedFromList: [],
            added: [...this.selectedList]
        }
    },
    props: {
        items: Array,
        selectedList: Array
    },
    computed: {
        options() {
            var arr = []
            this.items.forEach(item => {
                arr.push({
                    value: item.id,
                    text: item.name,
                    disabled: this.isSelected(item.id)
                })
            })
            return arr
        },
        output() {
            return this.added
        }
    },
    methods: {
        addItem() {
            if (this.currentSelected) {
                var item = this.items.find(item => item.id === this.currentSelected)
                this.added.push({
                    ...item
                })
                this.currentSelected = null
            }
        },
        removeItem(itemArg) {
            this.added = this.added.filter(item => item.id !== itemArg.id)
            
        },
        isSelected(id) {
            var item = this.output.find(item => item.id === id)
            return !!item
        },
        sendList() {
            this.$emit('selected', [...this.added])
        }

    }
}
</script>

<style>

</style>
