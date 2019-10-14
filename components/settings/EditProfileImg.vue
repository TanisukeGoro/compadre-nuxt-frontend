<template>
    <v-layout column>
        <v-card flat>
            <div class="text-center pt-5 px-5">
                <croppa
                    v-model="croppaImg"
                    :width="240"
                    :height="240"
                    :placeholder="'Click and Upload Image'"
                    :quality="1"
                    :placeholder-font-size="18"
                    initial-position="center"
                    canvas-color="#E4E4E4"
                    prevent-white-space
                    style="position: relative; border-radius: 50%;"
                />
            </div>
            <v-card-actions class="mx-3">
                <v-btn
                    color="accent"
                    class="ma-2"
                    text
                    @click="$emit('cancelProfileImg')"
                >
                    cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="ma-2 align-center accent--text"
                    depressed
                    :loading="submitStatus"
                    @click="imageUploader"
                >
                    <v-icon color="accent">mdi-cloud-upload</v-icon>&nbsp;Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
import '~/plugins/croppa'
export default {
    data() {
        return {
            croppaImg: null,
            imgUrl: '',
            click: false,
            submitStatus: false,
            formData: new FormData()
        }
    },
    methods: {
        onClick() {
            this.click = true
        },
        generateImage() {
            const vm = this
            const url = vm.croppaImg.generateDataUrl()
            if (!url) {
                alert('no image')
                return
            }
            vm.imgUrl = url
            this.submitUserImg()
        },
        imageUploader() {
            this.submitStatus = true
            this.croppaImg.generateBlob((blob) => {
                if (blob) {
                    this.formData.append('face_image', blob)
                    this.$axios
                        .$post(
                            `${process.env.apiBaseUrl}imageupload`,
                            this.formData
                        )
                        .then(async (i) => {
                            await this.$auth.fetchUser()
                            this.submitStatus = false
                            this.$emit('cancelProfileImg')
                        })
                        .catch((i) => (this.submitStatus = false))
                } else {
                    alert('クリックして画像を追加してください')
                    this.submitStatus = false
                }
            })
        },
        submitUserImg() {
            this.submitStatus = true
        }
    }
}
</script>

<style>
canvas {
    border-radius: 50%;
}
</style>
