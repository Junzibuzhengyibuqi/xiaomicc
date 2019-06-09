<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h2>欢迎来到：</h2>
      <h4>美丽不打折商城管理后台</h4>
      <p>在这里您可以快速的管理你的商城，为每一份精美的商品，</p>
      <p>填上您所满意的价格，以及对它最精确的定位和描述。</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 1250px;
  height: 1200px;
  padding: 80px;
  margin-left: 30px;
  font-size: 30px;
  line-height: 46px;
  background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559659924754&di=39f039309acd17f89bc52ec88778d132&imgtype=0&src=http%3A%2F%2Fimgfs.oppo.cn%2Fuploads%2Fthread%2Fattachment%2F2017%2F10%2F22%2F15086385979324.jpg)
    no-repeat 0 0;
  background-size: contain;
}
h2 {
  background-image: -webkit-gradient(
    linear,
    left 0,
    right 0,
    from(rgb(255, 0, 0)),
    to(rgb(0, 0, 255))
  );
  -webkit-background-clip: text;
  /*必需加前缀 -webkit- 才支持这个text值 */
  -webkit-text-fill-color: transparent;
  /*text-fill-color会覆盖color所定义的字体颜色： */
}
h4 {
  margin: 10px 0 50px 400px;
  background-image: -webkit-gradient(
    linear,
    left 0,
    right 0,
    from(rgb(0, 255, 0)),
    to(rgb(0, 0, 255))
  );
  -webkit-background-clip: text;
  /*必需加前缀 -webkit- 才支持这个text值 */
  -webkit-text-fill-color: transparent;
  /*text-fill-color会覆盖color所定义的字体颜色： */
}
p {
  margin-left: 220px;
  font-size: 27px;
  width: 720px;
  text-align: center;
  font-weight: normal;
  background-image: -webkit-gradient(
    linear,
    left 0,
    right 0,
    from(rgb(220, 255, 0)),
    to(rgb(255, 0, 255))
  );
  -webkit-background-clip: text;
  /*必需加前缀 -webkit- 才支持这个text值 */
  -webkit-text-fill-color: transparent;
  /*text-fill-color会覆盖color所定义的字体颜色： */
}
</style>
