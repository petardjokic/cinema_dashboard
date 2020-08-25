<template>
<div>
    <b-table dark hover small responsive :table-class="`text-center text-${theme.TEXT_PRIMARY}`" :items=items :fields=fields>
        <template v-slot:cell(details)="row">
            <b-button size='sm' block variant='outline-light' :to="`invoices/${row.item.id}`">Details</b-button>
        </template>
        <template v-slot:cell(date)="row">
            {{new Date(row.item.issuedAt).toISOString().split('T')[0]}}
        </template>
        <template v-slot:cell(time)="row">
            {{new Date(row.item.issuedAt).toISOString().split('T')[1].substring(0,5)}}
        </template>
        <template v-slot:cell(status)="row">
            <span :class="row.item.active ? 'text-success': 'text-danger'">{{row.item.active ? "Active": "Canceled"}}</span>
        </template>
    </b-table>
</div>
</template>

<script>
import {
    Theme
} from '../_static/Theme'
export default {
    data() {
        return {
            theme: Theme,
            fields: ['id', 'date', 'time', 'status', 'details']
        }
    },
    props: {
        items: Array
    },
}
</script>

<style>

</style>
