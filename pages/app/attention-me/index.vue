<template>
    <v-app>
        <v-content>
            <v-list subheader>
                <v-subheader>Recent chat</v-subheader>
                <v-list-item
                    v-for="chat in chatLists"
                    :key="chat.id"
                    :to="`attention-me/${chat.id}`"
                    nuxt
                >
                    <v-list-item-avatar>
                        <v-img :src="chat.icon_url"></v-img>
                        <!-- <v-img :src="iconURL"></v-img> -->
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title
                            v-text="chat.name"
                        ></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon
                            :color="chat.active ? 'accent accent-4' : 'grey'"
                            >mdi-message</v-icon
                        >
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-content>
    </v-app>
</template>

<script>
import { firebase, db } from '~/plugins/firebase'

export default {
    data: () => ({
        items: [
            {
                active: true,
                title: 'Jason Oner',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            },
            {
                active: true,
                title: 'Ranee Carlson',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
            },
            {
                title: 'Cindy Baker',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
            },
            {
                title: 'Ali Connors',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
            }
        ],
        chatLists: '',
        // AWSの画像だったら爆速で取ってこれる感じか。
        iconURL: `${process.env.AwsStoreImageUrl}images/GDayPwYX4Ioeknxb6R6Dbn9eDHXdr2NNy94Dctp5.jpeg`
    }),
    asyncData({ $axios }) {
        return $axios
            .$get(`${process.env.apiBaseUrl}matching/islike`)
            .then((res) => {
                return { chatLists: res }
            })
    },
    methods: {
        check() {
            // console.log(
            //     this.chatLists.map((i) => i.toTole_uinfo.name).join('\n')
            // )
            // console.log(this.chatLists)
            // db.collection(
            //     `/chat_rooms/$2y$10$MQqF4m4kFjKQGj2fPqhQWOosFr8F57WElHdEbpWOtYt5KZKbdj6Iy/messages`
            // ).onSnapshot((snapshot) => {
            //     snapshot.docChanges().forEach((change) => {
            //         console.log(change.doc.data())
            //     })
            // })
            console.log(firebase)
            console.log(db)
        }
    }
}
</script>
