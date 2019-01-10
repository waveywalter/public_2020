<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="https://thewaveint.com/wp-content/uploads/2018/10/wave_intl_logo_new.png" alt="The Wave International" class="mb-5" />
      </div>
      <v-card>
        <v-card-text>
          <p>Welcome to The Wave international Administration App</p>
          <p>All processes will be run through this platform. </p>
          <p>This platform will encompass all of the day to day business operations that are required to run and maintain a facility that can pass JC,ACHA and DCF certification</p>
          <div class="text-xs-right">
            <em><small>&mdash; Walter Johnson</small></em>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat router to="/sign-in">Sign In</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
