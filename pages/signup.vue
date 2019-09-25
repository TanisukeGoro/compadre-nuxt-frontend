<template>
    <v-app>
        <v-content>
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <template v-for="n in steps">
                        <v-stepper-step
                            :key="`${n}-step`"
                            :complete="e1 > n"
                            :step="n"
                            editable
                        >
                            Step {{ n }}
                        </v-stepper-step>

                        <v-divider v-if="n !== steps" :key="n"></v-divider>
                    </template>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content :key="`1-content`" :step="1">
                        <v-card class="mb-12" flat>
                            <v-text-field
                                v-model="name"
                                :rules="nameRules"
                                :counter="20"
                                label="Your name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                        </v-card>

                        <v-btn color="primary" @click="nextStep(1)">
                            Continue
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-content :key="`2-content`" :step="2">
                        <v-card class="mb-12" flat>
                            <v-text-field
                                :append-icon="
                                    showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                :rules="[rules.required, rules.min]"
                                :type="showPassword ? 'text' : 'password'"
                                name="input-10-2"
                                label="Not vrisible"
                                hint="At least 8 characters"
                                value=""
                                class="input-group--focused"
                                @click:append="showPassword = !showPassword"
                            ></v-text-field>
                            <v-text-field
                                v-model="phone"
                                :rules="phoneRules"
                                label="Phone-Number"
                                required
                            ></v-text-field>
                            <!--  ここに入れる-->
                        </v-card>

                        <v-btn color="primary" @click="nextStep(2)">
                            Continue
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-content :key="`3-content`" :step="3">
                        <v-card class="mb-12" flat>
                            <v-text-field
                                type="number"
                                label="Number"
                                append-outer-icon="mdi-add"
                                prepend-icon="mdi-remove"
                            ></v-text-field>

                            <!--  ここに入れる -->
                        </v-card>

                        <v-btn color="primary" @click="nextStep(3)">
                            Continue
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-content :key="`4-content`" :step="4">
                        <v-card class="mb-12" flat>
                            <!--  ここに入れる -->
                        </v-card>

                        <v-btn color="primary" @click="nextStep(4)">
                            Continue
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-content :key="`5-content`" :step="5">
                        <v-card class="mb-12" flat>
                            <!--  ここに入れる -->
                        </v-card>

                        <v-btn color="primary" @click="nextStep(5)">
                            Continue
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-content>
    </v-app>
</template>

<script>
export default {
    layout: 'empty',
    auth: false,
    data() {
        return {
            e1: 1,
            steps: 5,
            /**
             * name validation
             */
            name: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v.length <= 20 || 'Name must be less than 20 characters'
            ],
            /**
             * email validation
             */
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'E-mail must be valid'
            ],
            /**
             * password validation
             */
            showPassword: false,
            password: 'Password',
            rules: {
                required: (value) => !!value || 'Required.',
                min: (v) => v.length >= 8 || 'Min 8 characters',
                emailMatch: () =>
                    "The email and password you entered don't match"
            },
            /**
             * phone validation
             */
            phone: '',
            phoneRules: [
                (v) => !!v || 'Phone number required',
                (v) => / /.test(v) || ''
            ]
        }
    },

    watch: {
        steps(val) {
            if (this.e1 > val) {
                this.e1 = val
            }
        }
    },

    methods: {
        nextStep(n) {
            if (n === this.steps) {
                this.e1 = 1
            } else {
                this.e1 = n + 1
            }
        }
    }
}
</script>
