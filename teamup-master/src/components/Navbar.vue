<template>
    <section>

        <nav class="navbar fixed-top">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="button_container" id="toggle">
                            <span class="top"></span>
                            <span class="middle"></span>
                            <span class="bottom"></span>
                        </div>
                    </div>
                </div>
            </div>
            
        </nav>
        <div class="overlay" id="overlay">
            <div class="container">
                <div class="">
                    <div class="">
                        <nav class="overlay-menu">
                            <ul>
                                <li><router-link to="/">Home</router-link></li>
                                <li><router-link to="/team/overview">Team overview</router-link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>





<style lang="less" scoped>
</style>
