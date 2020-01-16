<template>
<div class="cart">
<div>
    <b-table fixed borderless :items="items"></b-table>
</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            cart: {
                movie: "Film1",
                date: "22.2.2019",
                seats: [{
                    id: 1,
                    type: {
                        id: 1,
                        name: "Classic"
                    },
                    row: 1,
                    col: 1
                }]
            }
        }
    },
    computed: {
        items() {
            var mapped = []
            this.cart.seats.forEach(seat => {
                mapped.push({row :seat.row, col: seat.col, type: seat.type.name})
            })
            return mapped
        }
    }
}
</script>

<style>

</style>
