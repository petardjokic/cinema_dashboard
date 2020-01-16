<template>
<div>
    <b-table :stacked=vertical fixed borderless :items="convertForTable"></b-table>
</div>

</template>

<script>
export default {
    props: {
        item: Object,
        type: String,
        vertical: Boolean
    },
    computed: {
        convertForTable() {
            var value = null
            if (this.type === 'display') {
                this.convertTicket()
                value = this.convertDisplay()
            } else if (this.type === 'movie') {
                value = this.convertMovie()
            }else if (this.type === 'ticket') {
                value = this.convertTicket()
            }
            return value
        }
    },
    methods: {
        convertDisplay() {
            var display = {
                date: this.item.starts_at.toLocaleDateString(),
                time: this.item.starts_at.toLocaleTimeString(),
                movie: this.item.movie.title,
                hall: this.item.hall.title
            }
            return [display]
        },
        convertMovie() {
            var movie = {
                "Title": this.item.title,
                "Genre": this.listString(this.item.genres),
                "Prod. Company": this.listString(this.item.prodComps),
                "Year": this.item.year,
                "Duration": this.item.duration,
                "Description": this.item.description
            }
            return [movie]
        },
        convertTicket() {
            const tickets = this.item.tickets
            const classic = this.item.hall.seats.filter(seat => seat.type.id === 1)
            const vip = this.item.hall.seats.filter(seat => seat.type.id === 2)
            const love = this.item.hall.seats.filter(seat => seat.type.id === 3)
            
            var classicFree = classic.length - this.countTaken(classic, tickets)
            var vipFree = vip.length - this.countTaken(vip, tickets)
            var loveFree = love.length - this.countTaken(love, tickets)

            return [{ type: "Classic", price: this.item.price.classic, free: classicFree, total: classic.length, _rowVariant: 'primary'},
                    { type: "VIP", price: this.item.price.vip, free: vipFree, total: vip.length, _rowVariant: 'success'},
                    { type: "Love", price: this.item.price.love, free: loveFree, total: love.length, _rowVariant: 'danger'}
            ]
        },
        countTaken(type, tickets) {
            var typeTaken = []
            type.forEach(seat => {
                var arr = tickets.filter(ticket => ticket.seatId === seat.id)
                typeTaken.push(...arr)
            })
            return typeTaken.length
        },
        listString(arr) {
            var ret = ''
            arr.forEach(item => {
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
