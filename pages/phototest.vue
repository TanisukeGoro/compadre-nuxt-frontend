<template>
    <v-card title="プロフィール編集" text="Complete your profile">
        <div
            style="display: flex; position: relative; justify-content: center; align-items: flex-end; height: 120px;"
        >
            <v-avatar
                v-if="profile.image_file"
                size="90"
                class="mr-4"
                style="position: absolute;"
            >
                <v-img :src="profile.image_file" />
            </v-avatar>
            <v-avatar v-else size="90" class="mr-4" style="position: absolute;">
                <v-img :src="require('@/assets/images/onErrorUserImg.png')" />
            </v-avatar>
            <div style="position: absolute; width: 140px; text-align: end;">
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            color="#9F9F9F"
                            x-small
                            style="opacity: 0.9;"
                            v-on="on"
                        >
                            <v-icon dark>
                                mdi-camera
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <editPhoto />
                        <v-card-actions>
                            <div class="flex-grow-1" />
                            <v-btn color="primary" text @click="dialog = false">
                                キャンセル
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>
    </v-card>
</template>

<script>
import editPhoto from '~/components/settings/EditProfileImg.vue'
export default {
    components: {
        editPhoto
    },

    data() {
        return {
            name: '',
            age: '',
            birth: '',
            sex: '',
            profile: '',
            allergieFoods: [],
            selectAllergieFoods: [],
            selectFavoriteFoods: [],
            selectDislikeFoods: [],
            description: '',
            oldAllergieFoodId: [],
            dialog: false
        }
    },
    watch: {
        birth() {
            console.log(this.birth)
        }
    }
}
</script>
<style>
.userLink,
.tabBar {
    display: flex;
}
</style>
