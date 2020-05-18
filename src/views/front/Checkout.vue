<template>
    <div>
        <FontNavbar />
        <main role="main">
            <router-view></router-view>
        </main>
        <Email />
        <FontFooter />
    </div>
</template>

<script>

import FontNavbar from '../../components/FontNavbar.vue';
import Email from '../../components/Email.vue';
import FontFooter from '../../components/FontFooter.vue';


export default {
    components: {
        FontNavbar,
        Email,
        FontFooter,
    },
};
</script>